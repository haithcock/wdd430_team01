"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import ProductCard from "@/app/ui/ProductCard";
import Button from "@/app/ui/Button";

export default function SellPage() {
  const { data: session, status } = useSession();

  const [form, setForm] = React.useState({
    category: "",
    name: "",
    artisan: "",
    rating: 5,
    reviews: 0,
    price: "",
    originalPrice: undefined as number | undefined,
    onSale: false,
    imageUrl: "",
  });
  const [errors, setErrors] = React.useState<{
    name?: string;
    category?: string;
    price?: string;
    imageUrl?: string;
  }>({});

  const isValidHttpUrl = (value: string) => {
    if (!value) return false;
    try {
      const u = new URL(value);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  };

  function validate() {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.category.trim()) newErrors.category = "Category is required.";
    if (form.price === undefined || form.price === null || Number(form.price) <= 0) {
      newErrors.price = "Price must be greater than 0.";
    }
    if (!form.imageUrl.trim() || !isValidHttpUrl(form.imageUrl)) {
      newErrors.imageUrl = "Enter a valid http(s) image URL.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const itemForPreview = {
    id: 0,
    category: form.category,
    name: form.name || "Sample Product",
    artisan: form.artisan || (session?.user?.name ?? "Artisan"),
    rating: form.rating,
    reviews: form.reviews,
    price: Number(form.price) || 0,
    originalPrice: form.onSale ? form.originalPrice : undefined,
    onSale: form.onSale,
    imageUrl: form.imageUrl,
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: Number(form.price) }),
    });
    if (!res.ok) {
      const msg = await res.text();
      alert(`Error: ${msg}`);
      return;
    }
    alert("Product submitted!");
    setForm({
      category: "",
      name: "",
      artisan: "",
      rating: 5,
      reviews: 0,
      price: "",
      originalPrice: undefined,
      onSale: false,
      imageUrl: "",
    });
    setErrors({});
  }

  return (
    <main className="min-h-screen p-6 w-full bg-gradient-to-br from-white via-orange-100 to-red-50">
      <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB923C] to-[#EF4444]">
            List a Product
          </span>
        </h1>
        <div className="text-sm text-gray-600 flex items-center gap-3">
          {status === "authenticated" ? (
            <>
              <span>Signed in as {session?.user?.name ?? session?.user?.email}</span>
              <button className="underline" onClick={() => signOut({ callbackUrl: "/" })}>
                Sign out
              </button>
            </>
          ) : (
            <button className="underline" onClick={() => signIn(undefined, { callbackUrl: "/sell" })}>
              Sign in
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={onSubmit} className="bg-white rounded-xl border p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">Name</label>
            <input
              className={`w-full border rounded-md px-3 py-2 text-black placeholder-gray-400 ${errors.name ? "border-red-500" : ""}`}
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Carved Wooden Bowl"
              required
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">Category</label>
            <select
              className={`w-full border rounded-md px-3 py-2 ${form.category ? "text-black" : "text-gray-400"} ${errors.category ? "border-red-500" : ""}`}
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Pottery & Ceramics">Pottery & Ceramics</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Textiles & Fiber">Textiles & Fiber</option>
              <option value="Woodworking">Woodworking</option>
              <option value="Metalwork">Metalwork</option>
              <option value="Glass Art">Glass Art</option>
            </select>
            {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">Artisan</label>
            <input
              className="w-full border rounded-md px-3 py-2 text-black placeholder-gray-400"
              value={form.artisan}
              onChange={(e) => setForm((f) => ({ ...f, artisan: e.target.value }))}
              placeholder="Your shop or name"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">Price (USD)</label>
              <input
                type="number"
                min={0}
                className={`w-full border rounded-md px-3 py-2 text-black placeholder-gray-400 ${errors.price ? "border-red-500" : ""}`}
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                placeholder="0"
                required
              />
              {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">On sale?</label>
              <select
                className="w-full border rounded-md px-3 py-2 text-black"
                value={form.onSale ? "yes" : "no"}
                onChange={(e) => setForm((f) => ({ ...f, onSale: e.target.value === "yes" }))}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </div>
          {form.onSale && (
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">Original Price</label>
              <input
                type="number"
                min={0}
                className="w-full border rounded-md px-3 py-2 text-black placeholder-gray-400"
                value={form.originalPrice ?? 0}
                onChange={(e) =>
                  setForm((f) => ({ ...f, originalPrice: Number(e.target.value) || undefined }))
                }
                placeholder="e.g. 100"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">Image URL</label>
            <input
              className={`w-full border rounded-md px-3 py-2 text-black placeholder-gray-400 ${errors.imageUrl ? "border-red-500" : ""}`}
              value={form.imageUrl}
              onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
              placeholder="https://..."
            />
            {errors.imageUrl && <p className="text-red-600 text-sm mt-1">{errors.imageUrl}</p>}
          </div>
          <Button type="submit" className="w-full">
            Submit Product
          </Button>
        </form>
        <div className="space-y-3">
          <h2 className="text-lg font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB923C] to-[#EF4444]">
              Preview
            </span>
          </h2>
          <ProductCard item={itemForPreview} showAction={false} />
        </div>
      </div>
      </div>
    </main>
  );
}
