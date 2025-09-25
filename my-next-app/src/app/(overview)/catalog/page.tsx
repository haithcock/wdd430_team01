import ProductCard from "@/app/ui/ProductCard";

const data = [
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

export default function Catalog() {
  return (
    <div className="grid gap-8 justify-center grid-cols-[repeat(auto-fit,minmax(200px,300px))] py-32 bg-gray-50 px-8">
      {
        data.map(item => <ProductCard key={`catalog-item-${item.id}`} item={item} />)
      }
    </div>
  );
}

