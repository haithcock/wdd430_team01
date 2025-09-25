import { getProducts } from "@/app/lib/actions";
import ProductCard from "@/app/ui/ProductCard";


export default async function Catalog() {
  const products = await getProducts();
  return (
    <div className="grid gap-8 justify-center grid-cols-[repeat(auto-fit,minmax(200px,300px))] py-32 bg-gray-50 px-8">
      {
        products.map(item => <ProductCard key={`catalog-item-${item.product_id}`} 
          item={{id: item.product_id, category: item.category, name: item.name, artisan: item.artisan, rating: item.rating, reviews: item.reviews, price: item.price, originalPrice: item.original_price, onSale: item.on_sale, imageUrl: item.image_url}} />)
      }
    </div>
  );
}

