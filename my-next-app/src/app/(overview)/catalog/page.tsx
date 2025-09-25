import Products from "./Products"
export default function Catalog() {
  return (
    <div className="grid gap-8 justify-center grid-cols-[repeat(auto-fit,minmax(200px,300px))] py-32 bg-gray-50 px-8">
      <Products />
    </div>
  );
}

