import Products from "./Products";
import Filters from "@/app/ui/Filters";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Handcrafted Haven- Catalog',
};

export const dynamic = 'force-dynamic';

type Props = {
  searchParams: Promise<{ categories?: string, ratings?: string }>;
};
export default async function Catalog({ searchParams } : Props) {
  const {categories, ratings} = await searchParams;
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 md:px-8 lg:px-16">
  <div className="flex flex-col md:flex-row md:space-x-6">
    <Filters />
    <div className="flex-1 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Products categories={(categories ?? "").split(",")} ratings={(ratings ?? "").split(",").map(rating => parseInt(rating)).filter(n => !isNaN(n))} />
    </div>
  </div>
</main>
    
  );
}

