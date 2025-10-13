import ProductDetails from "@/app/ui/ProductDetails";
import { getProductsById } from "../../../../../../lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handcrafted Haven - Product Detail",
};

export default async function ProductById({
  params,
}: {
  params: { id: string }; // ❌ should not be a Promise
}) {
  const { id } = params; // ✅ params is already available synchronously
  const product = await getProductsById(id);

  return (
    <>
      {product ? (
        <ProductDetails product={product} /> // ✅ pass the prop
      ) : (
        <p className="text-center text-gray-500">Product not found.</p>
      )}
    </>
  );
}
