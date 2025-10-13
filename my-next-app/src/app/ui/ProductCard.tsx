"use client";
import Button from './Button';
import Image from 'next/image';
import Link from 'next/link';

export type ProductItem = {
  id: number;
  category: string;
  name: string;
  artisan: string;
  rating: number;
  reviews: number;
  price: number;
  imageUrl: string;
  onSale: boolean;         // any boolean
  originalPrice?: number;  // optional
};

type ProductCardProps = {
  item: ProductItem;
  showAction?: boolean;
};

export default function ProductCard({ item, showAction = true }: ProductCardProps) {
  const getImageSource = (value: string): string | null => {
    try {
      if (value.startsWith('/')) return value; // Local public path
      const u = new URL(value);
      return u.protocol === 'http:' || u.protocol === 'https:' || u.protocol === 'blob:' ? value : null;
    } catch {
      return null;
    }
  };

  const imageSrc = getImageSource(item.imageUrl);

  return (
   <Link
      href={`/catalog/product/${item.id}`}
      className="block group"
      key={item.id}
    >
      <div className="bg-white rounded-xl shadow-md overflow-hidden transform group-hover:-translate-y-1 transition-transform duration-300 ease-in-out">
        <div className="relative">
          {imageSrc ? (
            <Image
              src={imageSrc}
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
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {item.name}
          </h3>
          <p className="text-sm text-gray-600">{item.artisan}</p>

          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`fa-star text-sm ${
                  i < (item.rating ?? 0)
                    ? "fa-solid text-yellow-500"
                    : "fa-regular text-gray-300"
                }`}
              ></i>
            ))}
            <span className="text-gray-500 text-xs">({item.reviews})</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-base font-bold text-gray-900">${item.price}</span>
              {item.onSale && item.originalPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  ${item.originalPrice}
                </span>
              )}
            </div>
            {showAction && (
              <Button onClick={(e) => e.preventDefault()}>
                Add to cart
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
