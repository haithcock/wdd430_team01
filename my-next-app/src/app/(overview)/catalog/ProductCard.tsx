import { Suspense } from "react";
import Image from "next/image";
import clsx from "clsx";

function Card({name, description, price, imagePath}: {name?: string, description?: string, price?: number, imagePath?: string}){
  return (
    <div className="flex flex-col gap-2 p-2 bg-gray-100">
      <div className="flex gap-2 h-6">
        <h2 className={clsx(name ? "text-gray-800" : "bg-gray-300", "w-[75%] h-full")}>{name ?? ""}</h2>
        <span className={clsx(name ? "text-gray-800" : "bg-gray-300", "ml-auto w-[20%] h-full")}>{price ? `$${price}` : ""}</span>
      </div>
      <p className={clsx(name ? "text-gray-800" : "bg-gray-300 min-h-12 h-auto", "w-[100%] flex-1")}>{description ?? ""}</p>
      <div className="aspect-video w-full mt-auto">
        {(imagePath && <Image className="w-full h-full" src={imagePath} alt="" />) ?? <div className="w-full h-full bg-gray-300"></div>}
      </div>
    </div>
  );
}

export default function CardContainer(props:{name?: string, description?: string, price?: number, imagePath?: string}) {
  /** creator, rating, update, delete */
  return (
    <Suspense fallback={<Card />}>
      <Card {...props} />
    </Suspense>
  );
}