import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    const ratings = searchParams.get("ratings");
    const page = parseInt(searchParams.get("page") || "1", 10);

    const conditions: string[] = [];
    const params: (string | number)[] = [];

    // Filter by category title (from join)
    if (category) {
      params.push(category);
      conditions.push(`c.title = $${params.length}`);
    }

    // Filter by price
    if (min) {
      params.push(Number(min));
      conditions.push(`p.price >= $${params.length}`);
    }
    if (max) {
      params.push(Number(max));
      conditions.push(`p.price <= $${params.length}`);
    }

    // Filter by rating
    if (ratings) {
      params.push(Number(ratings));
      conditions.push(`p.rating = $${params.length}`);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    // Pagination
    const resPerPage = 12;
    const offset = resPerPage * (page - 1);
    params.push(resPerPage, offset);

    const query = `
      SELECT 
        p.product_id,
        c.title AS category,
        p.name,
        p.artisan,
        p.rating,
        p.reviews,
        p.price,
        p.original_price,
        p.on_sale,
        p.image_url
      FROM products p
      JOIN categories c ON p.category_id = c.id
      ${whereClause}
      ORDER BY p.product_id
      LIMIT $${params.length - 1}
      OFFSET $${params.length}
    `;

    const products = await sql.unsafe(query, params);

    return new Response(JSON.stringify(Array.isArray(products) ? products : []), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify([]), { status: 500 });
  }
}
