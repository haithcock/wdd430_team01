import { fetchFilteredProducts } from '../../../lib/data';
import ProductCard, { ProductItem } from '@/app/ui/ProductCard'; 
import Pagination from '@/app/ui/Pagination'; 
import { Suspense } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchPageProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

// --- Loading Skeleton Component ---
// Displays a loading state while the main data is being fetched.
async function SearchResultsSkeleton() {
    return (
        <div className="animate-pulse">
            <h2 className="text-xl font-medium text-gray-600 mb-4">
                Searching for products...
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(8)].map((_, i) => (
                    // Skeleton card structure mimics the ProductCard layout
                    <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-96">
                        {/* Image Placeholder */}
                        <div className="w-full h-56 bg-gray-200"></div>
                        <div className="p-4 space-y-3">
                            {/* Category Placeholder */}
                            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                            {/* Title Placeholder */}
                            <div className="h-6 bg-gray-400 rounded w-3/4"></div>
                            {/* Artisan Placeholder */}
                            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                            {/* Price & Button Placeholder */}
                            <div className="flex justify-between pt-4">
                                <div className="h-10 bg-gray-400 rounded w-1/4"></div>
                                <div className="h-10 bg-gray-300 rounded w-1/4"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Pagination Placeholder */}
            <div className="mt-12 flex w-full justify-center">
                 <div className="h-10 w-64 bg-gray-200 rounded-lg"></div>
            </div>
        </div>
    );
}


// --- Main Data Fetching Component ---
// This async component fetches and renders the actual data. 
async function SearchResults({ query, currentPage }: { query: string, currentPage: number }) {
 
  // 1. Fetch data from the database (lib/data.ts)
  const { products, totalPages } = await fetchFilteredProducts(query, currentPage);
 
  // 2. Handle zero results
  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl shadow-lg border border-gray-100">
        <MagnifyingGlassIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <p className="text-2xl font-medium text-gray-700">
          No handcrafted products found for &quot;<span className="text-[#EF4444]">{query}</span>&quot;.
        </p>
        <p className="text-gray-500 mt-2">
          Try simplifying your search term or checking your spelling.
        </p>
      </div>
    );
  }

  // 3. Render results and pagination
  return (
    <>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((item: ProductItem) => (
          // Use your existing ProductCard component
          <ProductCard
            key={item.id}
            item={item}
          />
        ))}
      </div>

      {/* Pagination component uses the totalPages count */}
      <div className="mt-12 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}


// --- Main Search Page (Server Component) ---
export default async function SearchPage({ searchParams }: SearchPageProps) {
  // Extract and validate parameters from the URL
  const params = await searchParams;
  const query =  params?.query || '';
  const currentPage = Number(params?.page) || 1;
 
  // Capitalize the query for better display in the header
  const capitalizedQuery = query.charAt(0).toUpperCase() + query.slice(1);
  const displayQuery = query ? capitalizedQuery : 'All Products';

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Search Header */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Product Search
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Viewing results for: 
          <span className="font-semibold text-[#EF4444] ml-2">
            &quot;{displayQuery}&quot;
          </span>
        </p>
        
        <Suspense key={query + currentPage} fallback={<SearchResultsSkeleton />}>
          <SearchResults query={query} currentPage={currentPage} />
        </Suspense>
      </div>
    </main>
  );
}
