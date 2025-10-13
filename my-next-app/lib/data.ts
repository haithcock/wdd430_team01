import postgres from "postgres";

// for search results
import type { ProductItem } from "@/app/ui/ProductCard";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const ITEMS_PER_PAGE = 12;

export async function fetchFilteredProducts(
  query: string,
  currentPage: number
): Promise<{ products: ProductItem[]; totalPages: number }> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const searchPattern = `%${query}%`;

  try {
    // 1. Query to count total matching products
    const countPromise = sql`
      SELECT COUNT(*) 
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE 
        p.name ILIKE ${searchPattern} OR
        c.title ILIKE ${searchPattern} OR
        p.artisan ILIKE ${searchPattern}
    `;

    // 2. Query to fetch paginated, filtered products
    const productsPromise = sql<{
      id: string;
      category: string;
      name: string;
      artisan: string;
      rating: string;
      reviews: string;
      price: string;
      original_price: string | undefined | null;
      on_sale: boolean;
      image_url: string;
    }[]>`
      SELECT 
        p.product_id AS id,
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
      WHERE 
        p.name ILIKE ${searchPattern} OR
        c.title ILIKE ${searchPattern} OR
        p.artisan ILIKE ${searchPattern}
      ORDER BY p.name ASC
      LIMIT ${ITEMS_PER_PAGE}
      OFFSET ${offset}
    `;

    const [countResult, productsResult] = await Promise.all([countPromise, productsPromise]);

    const totalProducts = Number(countResult[0].count);
    const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

    // Map to ProductItem type
    const products: ProductItem[] = productsResult.map((p) => ({
      id: parseInt(p.id),
      category: p.category,
      name: p.name,
      artisan: p.artisan,
      rating: parseFloat(p.rating),
      reviews: parseInt(p.reviews),
      price: parseFloat(p.price),
      originalPrice: p.original_price ? parseFloat(p.original_price) : undefined,
      onSale: p.on_sale,
      imageUrl: p.image_url,
    }));

    return {
      products,
      totalPages: totalPages === 0 ? 1 : totalPages,
    };
  } catch (error) {
    console.error("Database Error during filtered search:", error);
    return { products: [], totalPages: 1 };
  }
}




export async function getProducts() {
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
    JOIN categories c ON p.category_id = c.id;
  `;

  return data;
}

export async function getFeaturedProducts() {
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
    WHERE featured = TRUE
  `;

  return data;
}

export async function getProductsByCategory(category: string) {
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
    WHERE c.title = ${category}
  `;

  return data;
}

export async function getProductsById(id: string) {
  console.log(id)
  try {
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
      WHERE p.product_id = ${id};
    `;
    return data[0]; // return the first (and likely only) row
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
}

export async function getCategories() {
  const data = await sql`
    SELECT *
    FROM categories
  `;

  return data;
}
