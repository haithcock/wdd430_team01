export type Product = {
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
  sellerId: string;
};

// Demo in-memory store (resets on server restart)
export const products: Product[] = [];
