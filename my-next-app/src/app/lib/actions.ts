"use server"

import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

type ProductTypes = {
    category: string;
    name: string;
    artisan: string;
    rating: number;
    reviews: number;
    price: number;
    originalPrice?: number;
    onSale: boolean;
    imageUrl: string;
};
export async function createProduct(data: ProductTypes) {
  return await sql`
    INSERT INTO products (category, name, artisan, rating, reviews, price, original_price, on_sale, image_url)
    VALUES (${data.category}, ${data.name}, ${data.artisan}, ${data.rating}, ${data.reviews}, ${data.price}, ${data.originalPrice ?? null}, ${data.onSale}, ${data.imageUrl})
  `;
}
export async function getProducts() {//todo join artisan/creator
  const data = await sql`
    SELECT product_id, category, artisan, rating, price, original_price, on_sale, image_url
    FROM products
  `;

	return data;
}
