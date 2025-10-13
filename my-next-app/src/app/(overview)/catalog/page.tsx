import Products from "./Products";
import Filters from "@/app/ui/Filters";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Handcrafted Haven- Catalog',
};

export const dynamic = 'force-dynamic';

export default async function Catalog({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const params = await searchParams;
  const category = searchParams.category; // e.g., "Jewelry"
  const rating = searchParams.ratings ? Number(searchParams.ratings) : undefined; // e.g., 5
  const minPrice = searchParams.min ? Number(searchParams.min) : undefined; // e.g., 250
  const maxPrice = searchParams.max ? Number(searchParams.max) : undefined; // e.g., 450
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 md:px-8 lg:px-16">
  <div className="flex flex-col md:flex-row md:space-x-6">
    <Filters />
    <div className="flex-1 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Products category={category}
            rating={rating}
            minPrice={minPrice}
            maxPrice={maxPrice}/>
    </div>
  </div>
</main>
    
  );
}