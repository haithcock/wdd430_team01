import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// POST /api/reviews – Add a new review
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { product_id, rating, comment } = await req.json();

  if (!product_id || !rating) {
    return NextResponse.json({ error: "Missing product_id or rating" }, { status: 400 });
  }

  const userName = session.user?.name ?? "Anonymous";

  // Insert new review
  await sql`
    INSERT INTO reviews (product_id, user_name, rating, comment)
    VALUES (${product_id}, ${userName}, ${rating}, ${comment})
  `;

  // Update product average rating and review count
  await sql`
    UPDATE products
    SET rating = (
      SELECT ROUND(AVG(rating)::numeric, 1)
      FROM reviews
      WHERE product_id = ${product_id}
    ),
    reviews = (
      SELECT COUNT(*)
      FROM reviews
      WHERE product_id = ${product_id}
    )
    WHERE product_id = ${product_id}
  `;

  return NextResponse.json({ message: "Review added successfully!" }, { status: 201 });
}

// GET /api/reviews?product_id=123 – Fetch reviews for a product
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const product_id = searchParams.get("product_id");

  if (!product_id) {
    return NextResponse.json({ error: "Missing product_id" }, { status: 400 });
  }

  const reviews = await sql`
    SELECT review_id, user_name, rating, comment, created_at
    FROM reviews
    WHERE product_id = ${product_id}
    ORDER BY created_at DESC
  `;

  return NextResponse.json(reviews);
}
