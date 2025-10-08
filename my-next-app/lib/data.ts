import postgres from "postgres";

import { ProductItem } from "@/app/ui/ProductCard";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const ITEMS_PER_PAGE = 12;

type ProductFromDB = {
    id: number;
    category: string;
    name: string;
    artisan: string;
    rating: number;
    reviews: number;
    price: string; 
    original_price: string | null;
    on_sale: boolean;
    image_url: string;
};


export async function fetchFilteredProducts(
    query: string, 
    currentPage: number
): Promise<{ products: ProductItem[], totalPages: number }> {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const searchPattern = `%${query}%`; 

    try {
        const countPromise = sql`
            SELECT COUNT(*) 
            FROM products
            WHERE 
                name ILIKE ${searchPattern} OR
                category ILIKE ${searchPattern} OR
                artisan ILIKE ${searchPattern}
        `;

        //    FIX: Replaced 'any[]' with the specific 'ProductFromDB[]' type.
        const productsPromise = sql<ProductFromDB[]>`
            SELECT 
                product_id as id,
                category, 
                name, 
                artisan, 
                rating, 
                reviews, 
                price, 
                original_price, 
                on_sale, 
                image_url
            FROM products
            WHERE 
                name ILIKE ${searchPattern} OR
                category ILIKE ${searchPattern} OR
                artisan ILIKE ${searchPattern}
            ORDER BY name ASC
            LIMIT ${ITEMS_PER_PAGE} 
            OFFSET ${offset}
        `;

        const [countResult, productsResult] = await Promise.all([countPromise, productsPromise]);
        
        const totalProducts = Number(countResult[0].count);
        const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

		
        const products: ProductItem[] = productsResult.map(p => ({
            id: Number(p.id),
            category: p.category,
            name: p.name,
            artisan: p.artisan,
            rating: Number(p.rating),
            reviews: Number(p.reviews),
            price: p.price,
            originalPrice: p.original_price ?? undefined,
            onSale: p.on_sale,
            imageUrl: p.image_url,
        }));

        return {
            products,
            totalPages: totalPages === 0 ? 1 : totalPages,
        };
    } catch (error) {
        console.error('Database Error during filtered search:', error);
        return { products: [], totalPages: 1 };
    }
}




export async function getProducts() {//todo join artisan/creator
  const data = await sql`
    SELECT product_id, category, name, artisan, rating, price, original_price, on_sale, image_url
    FROM products
  `;

	return data;
}

export async function getFeaturedProducts() {//todo join artisan/creator
  const data = await sql`
    SELECT product_id, category, name, artisan, rating, price, original_price, on_sale, image_url
    FROM products
    WHERE featured = TRUE
  `;

	return data;
}

export async function getProductsByCategory(category: string) {
  // Capitalize first letter

  const data = await sql`
    SELECT product_id, category, name, artisan, rating, price, original_price, on_sale, image_url
    FROM products
    WHERE category = ${category}
  `;

  return data;
}
