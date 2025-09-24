import Card from "./ProductCard";
export default function Catalog() {
  return (
    <div className="grid gap-4 justify-center grid-cols-[repeat(auto-fit,minmax(200px,300px))]">
      <Card />
      <Card name="name" price={123.45} description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque natus autem minima sequi officiis numquam, quasi error id consequatur doloribus. Dolor, unde voluptatem rem libero soluta repellat dolorem itaque sapiente."/>
    </div>
  );
}

