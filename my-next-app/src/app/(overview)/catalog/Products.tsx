import { getFilteredProducts, getProducts, getProductsByCategory } from "../../../../lib/data";
import { unstable_noStore as noStore } from "next/cache";
import ProductCard from "@/app/ui/ProductCard";

// Products.tsx
interface ProductProps {
  categories?: string[];
  ratings?: number[];
}

export default async function Products({ categories, ratings }: ProductProps) {//console.log(categories)
  categories = categories?.filter(cat => cat !== '');//console.log(categories, ratings)
  noStore();
  const products = categories?.length || ratings?.length ? await getFilteredProducts(categories ?? [], ratings ?? []) : await getProducts();

  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500 text-lg">
        No products found.
      </p>
    );
  }

  return (
    <>
      {products.map((item) => (
        <ProductCard
          key={`catalog-item-${item.product_id}`}
          item={{
            id: item.product_id,
            category: item.category,
            name: item.name,
            artisan: item.artisan,
            rating: item.rating,
            reviews: item.reviews,
            price: item.price,
            originalPrice: item.original_price,
            onSale: item.on_sale,
            imageUrl: item.image_url,
          }}
        />
      ))}
    </>
  );
}
