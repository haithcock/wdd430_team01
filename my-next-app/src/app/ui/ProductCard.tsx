import Button from './Button';
import Image from 'next/image';

type ProductCardProps = {
  item: {
    id: number;
    category: string;
    name: string;
    artisan: string;
    rating: number;
    reviews: number;
    price: number;
    originalPrice?: number;
    onSale: boolean;
    imageUrl: string;
  };
  showAction?: boolean;
};

export default function ProductCard({ item, showAction = true }: ProductCardProps) {
  const isValidHttpUrl = (value: string) => {
    try {
      const u = new URL(value);
      return u.protocol === 'http:' || u.protocol === 'https:';
    } catch {
      return false;
    }
  };
  const isLocalPublicPath = (value: string) => typeof value === 'string' && value.startsWith('/');

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out">
      <div className="relative">
        {isValidHttpUrl(item.imageUrl) || isLocalPublicPath(item.imageUrl) ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            width={400}
            height={400}
            className="w-full h-56 object-cover"
          />
        ) : (
          <div className="w-full h-56 bg-gray-100 flex items-center justify-center text-gray-500">
            Image preview
          </div>
        )}
        {item.onSale && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-[#FB923C] to-[#EF4444] text-white text-xs font-bold px-3 py-1 rounded-full">
            Sale
          </div>
        )}
      </div>
      <div className="p-4 space-y-3">
        <p className="text-sm text-gray-500">{item.category}</p>
        <h3 className="text-lg font-semibold text-gray-900 truncate">{item.name}</h3>
        <p className="text-sm text-gray-600">{item.artisan}</p>
        <div className="flex items-center space-x-1">
          <i className="fa-solid fa-star text-yellow-500 text-xl"></i>
          <span className="font-bold text-gray-800">{item.rating}</span>
          <span className="text-gray-500 text-sm">({item.reviews})</span>
        </div>
        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-2xl font-bold text-gray-900">${item.price}</span>
            {item.onSale && item.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ${item.originalPrice}
              </span>
            )}
          </div>
            {showAction && (
              <Button>
                Add to cart
              </Button>
            )}
        </div>
      </div>
    </div>
  );
}