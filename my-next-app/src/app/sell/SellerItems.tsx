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



}
