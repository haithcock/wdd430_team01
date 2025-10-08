import ProductCard, { ProductItem } from "../ui/ProductCard";

interface SearchResultsProps {
  items: ProductItem[];
  query: string;
}

export default function SearchResults({ items, query }: SearchResultsProps) {
  const title = query 
    ? `Showing ${items.length} result${items.length !== 1 ? 's' : ''} for "${query}"`
    : "Latest Available Handcrafted Items";

  if (query && items.length === 0) {
    return (
      <div className="py-20 text-center bg-gray-50 rounded-xl border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">No results found for &quot;{query}&quot;</h2>
        <p className="text-gray-600">Try adjusting your search terms or check our categories.</p>
      </div>
    );
  }

  return (
    <section className="mt-8">
      <h2 className="text-xl font-medium text-gray-700 mb-6">{title}</h2>
      
      {/* Grid Layout for Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {items.map((item) => (
          // Use your existing ProductCard component
          <ProductCard key={item.id} item={item} showAction={true} />
        ))}
      </div>
    </section>
  );
}
