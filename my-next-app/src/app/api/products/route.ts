import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { createProduct } from "../../../../lib/actions";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// const productSchema = z.object({
//   category: z.string().min(1),
//   name: z.string().min(1),
//   artisan: z.string().optional(),
//   rating: z.number().min(0).max(5).default(5),
//   reviews: z.number().min(0).default(0),
//   price: z.number().min(0),
//   originalPrice: z.number().min(0).optional(),
//   onSale: z.boolean().default(false),
//   imageUrl: z.string().url(),
// });

// export async function POST(req: Request) {
//   const session = await getServerSession(authOptions);
//   if (!session || !session.user) {
//     return new NextResponse("Unauthorized", { status: 401 });
//   }
//   const json = await req.json().catch(() => null);
//   const parsed = productSchema.safeParse(json);
//   if (!parsed.success) {
//     return NextResponse.json({ errors: parsed.error.flatten() }, { status: 400 });
//   }
//   const body = parsed.data;
//   const dbRow = await createProduct({
//     category: body.category,
//     name: body.name,
//     artisan: body.artisan ?? (session.user.name ?? "Unknown"),
//     rating: body.rating,
//     reviews: body.reviews,
//     price: body.price,
//     originalPrice: body.onSale ? body.originalPrice : undefined,
//     onSale: body.onSale,
//     imageUrl: body.imageUrl,
//     featured: false,
//   });

//   // postgres package returns an array-like result; pick the inserted row
//   const inserted = Array.isArray(dbRow) ? dbRow[0] : dbRow;
//   return NextResponse.json(inserted, { status: 201 });
// }

// export async function GET(req: Request) {
//   const session = await getServerSession(authOptions);
//   if (!session || !session.user) {
//     return new NextResponse("Unauthorized", { status: 401 });
//   }
//   const { searchParams } = new URL(req.url);
//   const mine = searchParams.get("mine");

//   if (mine === "1") {
//     const artisan = session.user.name ?? "";
//     const data = await sql`
//       SELECT product_id, category as c.title, name, artisan, rating, reviews, price, original_price, on_sale, image_url
//       FROM products JOIN categories c
//       ON products.category_id = c.id 
//       WHERE artisan = ${artisan}
//       ORDER BY product_id DESC
//     `;
//     return NextResponse.json(data);
//   }

//   const data = await sql`
//     SELECT product_id, category as c.title, name, artisan, rating, reviews, price, original_price, on_sale, image_url
//     FROM products JOIN categories c
//     ON products.category_id = c.id 
//     ORDER BY product_id DESC
//   `;
//   return NextResponse.json(data);
// }
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const mine = searchParams.get("mine");

  if (mine === "1") {
    const artisan = session.user.name ?? "";
    const data = await sql`
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
      WHERE p.artisan = ${artisan}
      ORDER BY p.product_id DESC
    `;
    return NextResponse.json(data);
  }

  const data = await sql`
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
    ORDER BY p.product_id DESC
  `;

  return NextResponse.json(data);
}

