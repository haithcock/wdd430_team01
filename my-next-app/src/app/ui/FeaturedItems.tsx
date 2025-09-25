import Button from '@/app/ui/Button';
import ProductCard from '@/app/ui/ProductCard';
import Link from 'next/link';
import { getFeaturedProducts } from '../lib/data';


export default async function FeaturedItems() {
  const featuredItemsData = (await getFeaturedProducts())
    .map((item => ({
      id: parseInt(item.product_id), 
      category: item.category as string, 
      name: item.name as string, 
      artisan: item.artisan as string, 
      rating: parseFloat(item.rating), 
      reviews: parseInt(item.reviews),
      price: parseFloat(item.price),
      originalPrice: item.original_price ? parseFloat(item.original_price) : undefined,
      onSale: item.on_sale as boolean,
      imageUrl: item.image_url as string
    })));
  return (
    <section className="bg-gradient-to-br from-orange-50 to-red-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FB923C] to-[#EF4444] mb-4">Featured Items</h2>
            <p className="mt-2 text-lg text-gray-600">
              Handpicked treasures from our talented artisans
            </p>
          </div>
            <Button className="mt-6">
                <Link className="w-full h-full flex items-center justify-center" href="/catalog">View all</Link>
            </Button>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredItemsData.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
