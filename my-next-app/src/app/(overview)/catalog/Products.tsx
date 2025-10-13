import { getProducts, getProductsByCategory } from "../../../../lib/data";
import { unstable_noStore as noStore } from "next/cache";
import ProductCard from "@/app/ui/ProductCard";

// Products.tsx
interface ProductProps {
  category?: string; // Only accept category if you want to filter
  // products?: Product[]; // remove this if fetching internally
}

export default async function Products({ category }: ProductProps) {
  noStore();
  const products = category ? await getProductsByCategory(category) : await getProducts();
  console.log(products);

  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500 text-lg">
        No products found{category ? ` in "${category}"` : ""} category.
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
