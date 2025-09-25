import { getProducts } from "@/app/lib/data";
import ProductCard from "@/app/ui/ProductCard";

export default async function Products() {
  const products = await getProducts();
  return (
    <>
    {
        products.map(item => <ProductCard key={`catalog-item-${item.product_id}`} 
          item={{id: item.product_id, category: item.category, name: item.name, artisan: item.artisan, rating: item.rating, reviews: item.reviews, price: item.price, originalPrice: item.original_price, onSale: item.on_sale, imageUrl: item.image_url}} />)
    }
    </>
  );
}