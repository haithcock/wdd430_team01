"use server"

import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

type ProductTypes = {
    category_id: number;
    name: string;
    artisan: string;
    rating: number;
    reviews: number;
    price: number;
    originalPrice?: number;
    onSale: boolean;
    imageUrl: string;
    featured?: boolean;
};

export async function createProduct(data: ProductTypes) {
  return await sql`
    INSERT INTO products (category_id, name, artisan, rating, reviews, price, original_price, on_sale, image_url, featured)
    VALUES (${data.category_id}, ${data.name}, ${data.artisan}, ${data.rating}, ${data.reviews}, ${data.price}, ${data.originalPrice ?? null}, ${data.onSale}, ${data.imageUrl}, ${data.featured ?? false})
    RETURNING product_id, category_id, name, artisan, rating, reviews, price, original_price, on_sale, image_url, featured
  `;
}


