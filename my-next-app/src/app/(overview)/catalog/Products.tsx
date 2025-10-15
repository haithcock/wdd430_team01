import { getProducts, getProductsByCategory, productFilter } from "../../../../lib/data";
import { unstable_noStore as noStore } from "next/cache";
import ProductCard from "@/app/ui/ProductCard";


// Products.tsx
interface Product {
  _id: string;
  name: string;
  image_url: string;
  price: number;
  stock: number;
  rating: number;
  category: string;
  artisan: string;
}



interface ProductProps {
  category?: string;
  rating?: number;    // Add this
  minPrice?: number;  // Add this
  maxPrice?: number;  // Add this
}


// Define the product interface based on your database schema
interface Product {
  product_id: number;
  category: string;
  name: string;
  description?: string | null;
  artisan: string;
  rating: number;
  reviews: number;
  price: number;
  original_price: number;
  on_sale: boolean;
  image_url: string;
}

export default async function Products({ category, rating, minPrice, maxPrice }: ProductProps) {
  noStore();

  let products;

  // 1️⃣ If no params → get all products
  if (!category && !rating && !minPrice && !maxPrice) {
    products = await getProducts();
  } 
  // 2️⃣ If only category → get products by category
  else if (category && !rating && !minPrice && !maxPrice) {
    products = await getProductsByCategory(category);
  } 
  // 3️⃣ Otherwise → use filtered query
  else {
    products = await productFilter({ category, rating, minPrice, maxPrice });
  }

  if (!products || products.length === 0) {
    return (
      <p className="text-center text-gray-500 text-lg">
        No products found
        {category ? ` in "${category}"` : ""}.
      </p>
    );
  }

  return (
    <>
   {products.map((item) => (  // Remove the : Product type annotation
  <ProductCard 
    key={`catalog-item-${item.product_id}`} 
    item={{
      id: item.product_id, 
      category: item.category, 
      name: item.name, 
      description: item.description ?? undefined,
      artisan: item.artisan, 
      rating: item.rating, 
      reviews: item.reviews, 
      price: item.price, 
      originalPrice: item.original_price, 
      onSale: item.on_sale, 
      imageUrl: item.image_url
    }} 
  />
))}
    </>
  );
}


//suggestion from chatgpt

// // Products.tsx
// import ProductCard from "@/app/ui/ProductCard";
// import { getProductsByCategory, getProductsFiltered } from "../../../../lib/data";

// export default async function Products({ searchParams }: { searchParams: any }) {
//   const products = await getProductsByCategory() || await getProductsFiltered({
//     category: searchParams?.category,
//     min: searchParams?.min,
//     max: searchParams?.max,
//     ratings: searchParams?.ratings,
//   });

//   if (!products || products.length === 0) {
//     return <p>No products found.</p>;
//   }

//   return (
//     <>
//       {products.map((item) => (
//         <ProductCard
//           key={item.product_id}
//           item={{
//             id: item.product_id,
//             category: item.category,
//             name: item.name,
//             artisan: item.artisan,
//             rating: item.rating,
//             reviews: item.reviews,
//             price: item.price,
//             originalPrice: item.original_price,
//             onSale: item.on_sale,
//             imageUrl: item.image_url,
//           }}
//         />
//       ))}
//     </>
//   );
// }