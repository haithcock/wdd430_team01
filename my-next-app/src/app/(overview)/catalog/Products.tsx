import { getProducts, getProductsByCategory } from "../../../../lib/data";
import ProductCard from "@/app/ui/ProductCard";

interface ProductProps {
  category?: string;
}

export default async function Products({category}: ProductProps) {
  const products = category? await getProductsByCategory(category): await getProducts();
  console.log(products)

  if (products.length === 0){
    return(
      <p className="text-center text-gray-500 text-lg">
        No products found{category ? ` in "${category}"` : ""}.
      </p>
    )
  }
  return (
    <>
    {
        products.map((item: any) => <ProductCard key={`catalog-item-${item.product_id}`} 
          item={{id: item.product_id, category: item.category, name: item.name, artisan: item.artisan, rating: item.rating, reviews: item.reviews, price: item.price, originalPrice: item.original_price, onSale: item.on_sale, imageUrl: item.image_url}} />)
    }
    </>
  );
}