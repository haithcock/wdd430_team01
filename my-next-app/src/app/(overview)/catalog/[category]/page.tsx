import Products from "../Products"
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Handcrafted Haven - Catalog by Category',
};

export default async function CatalogByCategory({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const {category} = await params;
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  return (
    <div className="grid gap-8 justify-center grid-cols-[repeat(auto-fit,minmax(200px,300px))] py-32 bg-gray-50 px-8">
      <Products category={formattedCategory} />
    </div>
    
  );
}