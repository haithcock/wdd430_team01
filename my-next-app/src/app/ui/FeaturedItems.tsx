import Button from '@/app/ui/Button';
import ProductCard from '@/app/ui/ProductCard';
import Link from 'next/link';

const featuredItemsData = [
  {
    id: 1,
    category: 'Pottery',
    name: 'Hand-Thrown Ceramic Vase',
    artisan: 'by Sarah Chen',
    rating: 4.9,
    reviews: 127,
    price: 89,
    originalPrice: 120,
    onSale: true,
    imageUrl: '/placeholder-images/vase.jpg',
  },
  {
    id: 2,
    category: 'Jewelry',
    name: 'Sterling Silver Pendant...',
    artisan: 'by Marcus Rivera',
    rating: 5,
    reviews: 89,
    price: 145,
    onSale: false,
    imageUrl: '/placeholder-images/jewelry.jpg',
  },
  {
    id: 3,
    category: 'Textiles',
    name: 'Handwoven Wool Throw...',
    artisan: 'by Emma Thompson',
    rating: 4.8,
    reviews: 203,
    price: 198,
    onSale: false,
    imageUrl: '/placeholder-images/textiles.jpg',
  },
  {
    id: 4,
    category: 'Woodworking',
    name: 'Reclaimed Wood Coffee Table',
    artisan: 'by David Park',
    rating: 4.9,
    reviews: 76,
    price: 425,
    onSale: false,
    imageUrl: '/placeholder-images/table.jpg',
  },
];

export default function FeaturedItems() {
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
