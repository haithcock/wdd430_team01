import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function getProducts() {
  const data = await sql`
    SELECT product_id, category, name, artisan, rating, reviews, price, original_price, on_sale, image_url
    FROM products
  `;

  return data;
}

export async function getFeaturedProducts() {
  const data = await sql`
    SELECT product_id, category, name, artisan, rating, reviews, price, original_price, on_sale, image_url
    FROM products
    WHERE featured = TRUE
  `;

  return data;
}

export async function getProductsByCategory(category: string) {
  const data = await sql`
    SELECT product_id, category, name, artisan, rating, reviews, price, original_price, on_sale, image_url
    FROM products
    WHERE category = ${category}
  `;

  return data;
}