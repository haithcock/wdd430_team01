import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { products } from "../../../lib/products";
import ProductCard from "@/app/ui/ProductCard";

export default async function SellerItems() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return null;
  }
  // @ts-expect-error id is injected in session callback
  const sellerId: string = session.user.id;

  const mine = products.filter((p) => p.sellerId === sellerId);

  return (
    <section className="mt-10">
      <h2 className="text-xl font-extrabold mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB923C] to-[#EF4444]">
          Your Items
        </span>
      </h2>
      {mine.length === 0 ? (
        <p className="text-gray-600">You do not have any items yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mine.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
