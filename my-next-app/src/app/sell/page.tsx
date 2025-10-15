// "use client";
// import React from "react";
// import { useSession, signIn, signOut } from "next-auth/react";
// import ProductCard from "@/app/ui/ProductCard";
// import Button from "@/app/ui/Button";

// type ProductItem = {
//   id: number;
//   category: string;
//   name: string;
//   artisan: string;
//   rating: number;
//   reviews: number;
//   price: number;
//   imageUrl: string;
//   onSale: boolean;
//   originalPrice?: number;
// };

// type DbProduct = {
//   product_id: number;
//   category: string;
//   name: string;
//   artisan: string;
//   rating: number;
//   reviews: number;
//   price: number;
//   original_price: number | null;
//   on_sale: boolean;
//   image_url: string;
// };

// export default function SellPage() {
//   const { data: session, status } = useSession();

//   const [form, setForm] = React.useState({
//     category_id: "",
//     name: "",
//     artisan: "",
//     rating: 1,
//     reviews: 0,
//     price: "",
//     originalPrice: undefined as number | undefined,
//     onSale: false,
//   });
  
//   const [file, setFile] = React.useState<File | null>(null);
//   const fileInputRef = React.useRef<HTMLInputElement | null>(null);
//   const [previewUrl, setPreviewUrl] = React.useState<string>("");
//   const [myProducts, setMyProducts] = React.useState<DbProduct[]>([]);
//   const [loadingMyProducts, setLoadingMyProducts] = React.useState(false);
//   type Category = { id: number; title: string };

// const [categories, setCategories] = React.useState<{ id: number; title: string }[]>([]);

// React.useEffect(() => {
//   async function loadCategories() {
//     try {
//       const res = await fetch("/api/categories");
//       if (!res.ok) throw new Error("Failed to fetch categories");
//       const data = await res.json();
//       setCategories(data);
//     } catch (err) {
//       console.error(err);
//     }
//   }
//   void loadCategories();
// }, []);

//   const [errors, setErrors] = React.useState<{
//     name?: string;
//     category?: string;
//     price?: string;
//     file?: string;
//   }>({});


//   function validate() {
//     const newErrors: typeof errors = {};
//     if (!form.name.trim()) newErrors.name = "Name is required.";
//     if (!form.category_id.trim()) newErrors.category = "Category is required.";
//     if (!form.price || Number(form.price) <= 0) newErrors.price = "Price must be greater than 0.";
//     // Require an image file upload
//     if (!file) newErrors.file = "Please upload an image file.";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   }

//   const itemForPreview: ProductItem = {
//     id: 0,
//     category: form.category_id || "Category",
//     name: form.name || "Sample Product",
//     artisan: form.artisan || session?.user?.name || "Artisan",
//     rating: form.rating,
//     reviews: form.reviews,
//     price: Number(form.price) || 0,
//     onSale: form.onSale,
//     originalPrice: form.onSale ? form.originalPrice ?? 0 : undefined,
//     imageUrl: previewUrl,
//   };

//   async function onSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     if (!validate()) return;

//     // If a file is selected, upload to Vercel Blob to get a public URL
//     let imageUrlToUse = "";
//     if (file) {
//       const fd = new FormData();
//       fd.append("file", file);
//       const uploadRes = await fetch("/api/upload", { method: "POST", body: fd });
//       if (!uploadRes.ok) {
//         const msg = await uploadRes.text();
//         alert(`Upload failed: ${msg}`);
//         return;
//       }
//       const uploaded = (await uploadRes.json()) as { url: string };
//       imageUrlToUse = uploaded.url;
//     }

//     const res = await fetch("/api/products", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ...form, imageUrl: imageUrlToUse, price: Number(form.price) }),
//     });

//     if (!res.ok) {
//       const msg = await res.text();
//       alert(`Error: ${msg}`);
//       return;
//     }

//     alert("Product submitted!");
//     setForm({
//       category_id: "",
//       name: "",
//       artisan: "",
//       rating: 1,
//       reviews: 0,
//       price: "",
//       originalPrice: undefined,
//       onSale: false,
//     });
//     setFile(null);
//     setPreviewUrl("");
//     setErrors({});
//     if (fileInputRef.current) fileInputRef.current.value = ""; // clear file input

//     // refresh list
//     void loadMyProducts();
//   }

//   async function loadMyProducts() {
//     if (status !== "authenticated") return;
//     try {
//       setLoadingMyProducts(true);
//       const res = await fetch("/api/products?mine=1");
//       if (!res.ok) return;
//       const data = (await res.json()) as DbProduct[];
//       setMyProducts(data);
//     } finally {
//       setLoadingMyProducts(false);
//     }
//   }

//   React.useEffect(() => {
//     if (status === "authenticated") {
//       void loadMyProducts();
//     } else {
//       setMyProducts([]);
//     }
//   }, [status]);

//   // Prefill artisan from authenticated user to avoid empty values
//   React.useEffect(() => {
//     if (status === "authenticated") {
//       setForm((f) => ({
//         ...f,
//         artisan: f.artisan || (session?.user?.name ?? ""),
//       }));
//     } else {
//       setForm((f) => ({ ...f, artisan: "" }));
//     }
//   }, [status, session?.user?.name]);

//   // Create and clean up preview URL when file changes
//   React.useEffect(() => {
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setPreviewUrl(url);
//       return () => URL.revokeObjectURL(url);
//     } else {
//       setPreviewUrl("");
//     }
//   }, [file]);

//   async function handleDelete(id: number) {
//     if (!confirm("Delete this product?")) return;
//     const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
//     if (!res.ok && res.status !== 204) {
//       const msg = await res.text();
//       alert(`Failed to delete: ${msg}`);
//       return;
//     }
//     await loadMyProducts();
//   }

//   return (
//     <main className="min-h-screen p-6 w-full bg-gradient-to-br from-white via-orange-100 to-red-50">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-2xl font-extrabold">
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB923C] to-[#EF4444]">
//               List a Product
//             </span>
//           </h1>
//           <div className="text-sm text-gray-600 flex items-center gap-3">
//             {status === "authenticated" ? (
//               <>
//                 <span>Logged in as {session?.user?.name ?? session?.user?.email}</span>
//                 <button className="underline" onClick={() => signOut({ callbackUrl: "/" })}>
//                   Sign out
//                 </button>
//               </>
//             ) : (
//               <button className="underline" onClick={() => signIn(undefined, { callbackUrl: "/sell" })}>
//                 Sign in
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Form */}
//           <form onSubmit={onSubmit} className="bg-white rounded-xl border p-6 space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-1 text-gray-600">Name</label>
//               <input
//                 className={`w-full border rounded-md px-3 py-2 text-black placeholder-gray-400 ${
//                   errors.name ? "border-red-500" : ""
//                 }`}
//                 value={form.name}
//                 onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
//                 placeholder="e.g. Carved Wooden Bowl"
//                 required
//               />
//               {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
//             </div>

//              <div>
//         <label className="block text-sm font-medium mb-1 text-gray-600">Category</label>
//         <select
//           className={`w-full border rounded-md px-3 py-2 ${
//             form.category_id ? "text-black" : "text-gray-400"
//           } ${errors.category ? "border-red-500" : ""}`}
//           value={form.category_id}
//           onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
//         >
//           <option value="" disabled>
//             Select a category
//           </option>
//           {categories.map((c) => (
//             <option key={c.id} value={c.id}>
//               {c.title}
//             </option>
//           ))}
//         </select>
//         {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category}</p>}
//       </div>

//             <div>
//               <label className="block text-sm font-medium mb-1 text-gray-600">Artisan</label>
//               <input
//                 className="w-full border rounded-md px-3 py-2 text-black placeholder-gray-400"
//                 value={form.artisan}
//                 onChange={(e) => setForm((f) => ({ ...f, artisan: e.target.value }))}
//                 placeholder="Your shop or name"
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1 text-gray-600">Price (USD)</label>
//                 <input
//                   type="number"
//                   min={0}
//                   className={`w-full border rounded-md px-3 py-2 text-black placeholder-gray-400 ${
//                     errors.price ? "border-red-500" : ""
//                   }`}
//                   value={form.price}
//                   onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
//                   placeholder="0"
//                   required
//                 />
//                 {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1 text-gray-600">On sale?</label>
//                 <select
//                   className="w-full border rounded-md px-3 py-2 text-black"
//                   value={form.onSale ? "yes" : "no"}
//                   onChange={(e) => setForm((f) => ({ ...f, onSale: e.target.value === "yes" }))}
//                 >
//                   <option value="no">No</option>
//                   <option value="yes">Yes</option>
//                 </select>
//               </div>
//             </div>

//             {form.onSale && (
//               <div>
//                 <label className="block text-sm font-medium mb-1 text-gray-600">Original Price</label>
//                 <input
//                   type="number"
//                   min={0}
//                   className="w-full border rounded-md px-3 py-2 text-black placeholder-gray-400"
//                   value={form.originalPrice ?? 0}
//                   onChange={(e) =>
//                     setForm((f) => ({ ...f, originalPrice: Number(e.target.value) || undefined }))
//                   }
//                   placeholder="e.g. 100"
//                 />
//               </div>
//             )}

//             <div>
//               <label className="block text-sm font-medium mb-1 text-gray-600">Upload an image</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 className={`w-full border rounded-md px-3 py-2 text-black ${errors.file ? "border-red-500" : ""}`}
//                 onChange={(e) => setFile(e.target.files?.[0] ?? null)}
//                 ref={fileInputRef}
//               />
//               {errors.file && <p className="text-red-600 text-sm mt-1">{errors.file}</p>}
//               {/* filename/placeholder line */}
//               <p className={`text-sm mt-1 ${file ? "text-black" : "text-gray-400"}`}>
//                 {file ? file.name : "Choose an image file..."}
//               </p>
//               <p className="text-xs text-gray-500 mt-1">Upload an image file (required). We will store it and use its URL automatically.</p>
//             </div>

//             <Button type="submit" className="w-full">
//               Submit Product
//             </Button>
//           </form>

//           {/* Preview */}
//           <div className="space-y-3">
//             <h2 className="text-lg font-extrabold">
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB923C] to-[#EF4444]">
//                 Preview
//               </span>
//             </h2>
//             <ProductCard item={itemForPreview} showAction={false} />
//           </div>
//         </div>

//         {/* My Products */}
//         {status === "authenticated" && (
//           <section className="mt-10">
//             <h2 className="text-lg font-extrabold mb-4">
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB923C] to-[#EF4444]">
//                 My Products
//               </span>
//             </h2>
//             {loadingMyProducts ? (
//               <p className="text-gray-500">Loading...</p>
//             ) : myProducts.length === 0 ? (
//               <p className="text-gray-500">No products yet.</p>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {myProducts.map((p) => (
//                   <div key={p.product_id} className="relative border rounded-lg p-2">
//                     <ProductCard
//                       item={{
//                         id: p.product_id,
//                         category: p.category,
//                         name: p.name,
//                         artisan: p.artisan,
//                         rating: p.rating,
//                         reviews: p.reviews,
//                         price: p.price,
//                         originalPrice: p.original_price ?? undefined,
//                         onSale: p.on_sale,
//                         imageUrl: p.image_url,
//                       }}
//                       showAction={false}
//                     />
//                     <div className="mt-2">
//                       <Button type="button" onClick={() => handleDelete(p.product_id)} className="w-full bg-red-600 hover:bg-red-700">
//                         Delete
//                       </Button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </section>
//         )}
//       </div>
//     </main>
//   );
// }
"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import ProductCard from "@/app/ui/ProductCard";
import Button from "@/app/ui/Button";

type ProductItem = {
  id: number;
  category: string;
  name: string;
  description?: string;
  artisan: string;
  rating: number;
  reviews: number;
  price: number;
  imageUrl: string;
  onSale: boolean;
  originalPrice?: number;
};

type DbProduct = {
  product_id: number;
  category: string;
  name: string;
  artisan: string;
  rating: number;
  reviews: number;
  price: number;
  description?: string | null;
  original_price: number | null;
  on_sale: boolean;
  image_url: string;
};

export default function SellPage() {
  const { data: session, status } = useSession();

  const [form, setForm] = React.useState({
    categoryId: "", // now holds the category ID
    name: "",
    description: "",
    artisan: "",
    rating: 1,
    reviews: 0,
    price: "",
    originalPrice: undefined as number | undefined,
    onSale: false,
  });

  const [file, setFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string>("");
  const [myProducts, setMyProducts] = React.useState<DbProduct[]>([]);
  const [loadingMyProducts, setLoadingMyProducts] = React.useState(false);
  const [categories, setCategories] = React.useState<{ id: number; title: string }[]>([]);
  const [errors, setErrors] = React.useState<{ name?: string; category?: string; price?: string; file?: string }>({});

  // Load categories
  React.useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    }
    void loadCategories();
  }, []);

  function validate() {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.categoryId) newErrors.category = "Category is required.";
    if (!form.price || Number(form.price) <= 0) newErrors.price = "Price must be greater than 0.";
    if (!file) newErrors.file = "Please upload an image file.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Find readable category name for preview
  const selectedCategory = categories.find((c) => String(c.id) === form.categoryId)?.title || "Category";

  const itemForPreview: ProductItem = {
    id: 0,
    category: selectedCategory,
    name: form.name || "Sample Product",
    description: form.description || undefined,
    artisan: form.artisan || session?.user?.name || "Artisan",
    rating: form.rating,
    reviews: form.reviews,
    price: Number(form.price) || 0,
    onSale: form.onSale,
    originalPrice: form.onSale ? form.originalPrice ?? 0 : undefined,
    imageUrl: previewUrl,
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    let imageUrlToUse = "";
    if (file) {
      const fd = new FormData();
      fd.append("file", file);
      const uploadRes = await fetch("/api/upload", { method: "POST", body: fd });
      if (!uploadRes.ok) {
        const msg = await uploadRes.text();
        alert(`Upload failed: ${msg}`);
        return;
      }
      const uploaded = (await uploadRes.json()) as { url: string };
      imageUrlToUse = uploaded.url;
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        description: form.description || undefined,
        artisan: form.artisan,
        rating: form.rating,
        reviews: form.reviews,
        price: Number(form.price),
        originalPrice: form.originalPrice,
        onSale: form.onSale,
        category_id: Number(form.categoryId), // ✅ send category ID
        imageUrl: imageUrlToUse,
      }),
    });

    if (!res.ok) {
      const msg = await res.text();
      alert(`Error: ${msg}`);
      return;
    }

    alert("Product submitted!");
    setForm({
      categoryId: "",
      name: "",
      description: "",
      artisan: "",
      rating: 1,
      reviews: 0,
      price: "",
      originalPrice: undefined,
      onSale: false,
    });
    setFile(null);
    setPreviewUrl("");
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = "";
    void loadMyProducts();
  }

  async function loadMyProducts() {
    if (status !== "authenticated") return;
    try {
      setLoadingMyProducts(true);
      const res = await fetch("/api/products?mine=1");
      if (!res.ok) return;
      const data = (await res.json()) as DbProduct[];
      setMyProducts(data);
    } finally {
      setLoadingMyProducts(false);
    }
  }

  React.useEffect(() => {
    if (status === "authenticated") void loadMyProducts();
    else setMyProducts([]);
  }, [status]);

  React.useEffect(() => {
    if (status === "authenticated") {
      setForm((f) => ({
        ...f,
        artisan: f.artisan || (session?.user?.name ?? ""),
      }));
    } else {
      setForm((f) => ({ ...f, artisan: "" }));
    }
  }, [status, session?.user?.name]);

  React.useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl("");
    }
  }, [file]);

  async function handleDelete(id: number) {
    if (!confirm("Delete this product?")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (!res.ok && res.status !== 204) {
      const msg = await res.text();
      alert(`Failed to delete: ${msg}`);
      return;
    }
    await loadMyProducts();
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
                <span>Logged in as {session?.user?.name ?? session?.user?.email}</span>
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
          {/* Form */}
          <form onSubmit={onSubmit} className="bg-white rounded-xl border p-6 space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">Name</label>
              <input
                className={`w-full border rounded-md px-3 py-2 text-black placeholder-gray-400 ${
                  errors.name ? "border-red-500" : ""
                }`}
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Carved Wooden Bowl"
                required
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">Category</label>
              <select
                className={`w-full border rounded-md px-3 py-2 ${
                  form.categoryId ? "text-black" : "text-gray-400"
                } ${errors.category ? "border-red-500" : ""}`}
                value={form.categoryId}
                onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category}</p>}
            </div>

            {/* Artisan */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">Artisan</label>
            <input
              className="w-full border rounded-md px-3 py-2 text-black placeholder-gray-400"
              value={form.artisan}
              onChange={(e) => setForm((f) => ({ ...f, artisan: e.target.value }))}
              placeholder="Your shop or name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">Description</label>
            <textarea
              className="w-full border rounded-md px-3 py-2 text-black placeholder-gray-400 min-h-28"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Tell customers about your product (materials, size, story, etc.)"
              maxLength={2000}
            />
            <p className="text-xs text-gray-500 mt-1">Up to 2000 characters.</p>
          </div>
            {/* Price & On Sale */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">Price (USD)</label>
                <input
                  type="number"
                  min={0}
                  className={`w-full border rounded-md px-3 py-2 text-black placeholder-gray-400 ${
                    errors.price ? "border-red-500" : ""
                  }`}
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

            {/* Original Price (if on sale) */}
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

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">Upload an image</label>
              <input
                type="file"
                accept="image/*"
                className={`w-full border rounded-md px-3 py-2 text-black ${errors.file ? "border-red-500" : ""}`}
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                ref={fileInputRef}
              />
              {errors.file && <p className="text-red-600 text-sm mt-1">{errors.file}</p>}
              <p className={`text-sm mt-1 ${file ? "text-black" : "text-gray-400"}`}>
                {file ? file.name : "Choose an image file..."}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Upload an image file (required). We will store it and use its URL automatically.
              </p>
            </div>

            <Button type="submit" className="w-full">
              Submit Product
            </Button>
          </form>

          {/* Preview */}
          <div className="space-y-3">
            <h2 className="text-lg font-extrabold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB923C] to-[#EF4444]">
                Preview
              </span>
            </h2>
            <ProductCard item={itemForPreview} showAction={false} />
          </div>
        </div>

        {/* My Products */}
        {status === "authenticated" && (
          <section className="mt-10">
            <h2 className="text-lg font-extrabold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB923C] to-[#EF4444]">
                My Products
              </span>
            </h2>
            {loadingMyProducts ? (
              <p className="text-gray-500">Loading...</p>
            ) : myProducts.length === 0 ? (
              <p className="text-gray-500">No products yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {myProducts.map((p) => (
                  <div key={p.product_id} className="relative border rounded-lg p-2">
                    <ProductCard
                      item={{
                        id: p.product_id,
                        category: p.category,
                        name: p.name,
                        description: p.description ?? undefined,
                        artisan: p.artisan,
                        rating: p.rating,
                        reviews: p.reviews,
                        price: p.price,
                        originalPrice: p.original_price ?? undefined,
                        onSale: p.on_sale,
                        imageUrl: p.image_url,
                      }}
                      showAction={false}
                    />
                    <div className="mt-2">
                      <Button
                        type="button"
                        onClick={() => handleDelete(p.product_id)}
                        className="w-full bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
