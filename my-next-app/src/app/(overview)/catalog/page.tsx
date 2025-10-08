import Products from "./Products"
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Handcrafted Haven- Catalog',
};

export const dynamic = 'force-dynamic';

export default function Catalog() {
  return (
    <div className="grid gap-8 justify-center grid-cols-[repeat(auto-fit,minmax(200px,300px))] py-32 bg-gray-50 px-8">
      <Products />
    </div>
  );
}

