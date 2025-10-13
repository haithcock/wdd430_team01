// "use client";
// import React, { useState } from "react";
// import Button from "./Button";

// const Filters = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [categories, setCategories] = React.useState<{ id: number; title: string }[]>([]);

//   React.useEffect(() => {
//     async function loadCategories() {
//       try {
//         const res = await fetch("/api/categories");
//         if (!res.ok) throw new Error("Failed to fetch categories");
//         const data = await res.json();
//         setCategories(data);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//     void loadCategories();
//   }, []);

//   function checkHandler(checkBoxType: string, checkBoxValue: string) {
//     if (typeof window !== "undefined") {
//       const queryParams = new URLSearchParams(window.location.search);
//       const value = queryParams.get(checkBoxType);
//       return checkBoxValue === value;
//     }
//     return false;
//   }

//   return (
//     <aside className="w-full md:w-1/5 mb-8 md:mb-0">
//       {/* Mobile Filter Button */}
//       <button
//         onClick={() => setMobileOpen(!mobileOpen)}
//         className="md:hidden mb-4 w-full text-center px-4 py-2 inline-block text-lg text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
//       >
//         {mobileOpen ? "Close Filters" : "Filter by"}
//       </button>

//       {/* Filters container */}
//       <div
//         className={`bg-white rounded shadow-sm border border-gray-200 p-6 space-y-6
//           ${mobileOpen ? "block" : "hidden"} md:block`}
//       >
//         {/* Price */}
//         <div>
//           <h3 className="font-semibold mb-3 text-gray-700">Price ($)</h3>
//           <div className="grid grid-cols-3 gap-2">
//             <input
//               name="min"
//               type="number"
//               placeholder="Min"
//               className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 w-full focus:outline-none focus:border-gray-400 hover:border-gray-400"
//             />
//             <input
//               name="max"
//               type="number"
//               placeholder="Max"
//               className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 w-full focus:outline-none focus:border-gray-400 hover:border-gray-400"
//             />
//             <Button>Go</Button>
//           </div>
//         </div>

//         {/* Categories */}
//         <div>
//           <h3 className="font-semibold mb-3 text-gray-700">Category</h3>
//           <ul className="space-y-2">
//             {categories.map((cat) => (
//               <li key={cat.id}>
//                 <label className="flex items-center cursor-pointer">
//                   <input
//                     name="category"
//                     type="checkbox"
//                     value={cat.title}
//                     defaultChecked={checkHandler("category", cat.title)}
//                     className="h-4 w-4"
//                   />
//                   <span className="ml-2 text-gray-600">{cat.title}</span>
//                 </label>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Ratings */}
//         <div>
//           <h3 className="font-semibold mb-3 text-gray-700">Ratings</h3>
//           <ul className="space-y-2">
//         {[5, 4, 3, 2, 1].map((rating) => (
//             <li key={rating}>
//             <label className="flex items-center cursor-pointer">
//                 <input
//                 name="ratings"
//                 type="checkbox"
//                 value={rating}
//                 defaultChecked={checkHandler("ratings", `${rating}`)}
//                 className="h-4 w-4"
//                 />
//                 <span className="ml-2 flex items-center space-x-1">
//                 {[...Array(rating)].map((_, i) => (
//                     <i key={i} className="fa-solid fa-star text-yellow-500 text-lg"></i>
//                 ))}
//                 </span>
//             </label>
//             </li>
//         ))}
//         </ul>
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default Filters;

//suggestion from chatgpt
// Filters.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "./Button";

const Filters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [categories, setCategories] = useState<{ id: number; title: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category")
  );
  const [minPrice, setMinPrice] = useState(searchParams.get("min") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max") || "");
  const [rating, setRating] = useState(searchParams.get("ratings") || "");

  // Load categories from API
  useEffect(() => {
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

  // Update URL whenever any filter changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    if (minPrice) params.set("min", minPrice);
    if (maxPrice) params.set("max", maxPrice);
    if (rating) params.set("ratings", rating);

    // push new URL without refreshing the page
    router.replace(`/catalog?${params.toString()}`);
  }, [selectedCategory, minPrice, maxPrice, rating, router]);

  return (
    <aside className="w-full md:w-1/5 mb-8 md:mb-0">
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden mb-4 w-full text-center px-4 py-2 inline-block text-lg text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
      >
        {mobileOpen ? "Close Filters" : "Filter by"}
      </button>

      <div
        className={`bg-white rounded shadow-sm border border-gray-200 p-6 space-y-6 ${
          mobileOpen ? "block" : "hidden"
        } md:block`}
      >
        {/* Price */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-700">Price ($)</h3>
          <div className="grid grid-cols-3 gap-2">
            <input
              name="min"
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 w-full focus:outline-none focus:border-gray-400 hover:border-gray-400"
            />
            <input
              name="max"
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 w-full focus:outline-none focus:border-gray-400 hover:border-gray-400"
            />
            <Button>Go</Button>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-700">Category</h3>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.id}>
                <label className="flex items-center cursor-pointer">
                  <input
                    name="category"
                    type="radio" // single category selection
                    value={cat.title}
                    checked={selectedCategory === cat.title}
                    onChange={() => setSelectedCategory(cat.title)}
                    className="h-4 w-4"
                  />
                  <span className="ml-2 text-gray-600">{cat.title}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Ratings */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-700">Ratings</h3>
          <ul className="space-y-2">
            {[5, 4, 3, 2, 1].map((r) => (
              <li key={r}>
                <label className="flex items-center cursor-pointer">
                  <input
                    name="ratings"
                    type="radio"
                    value={r}
                    checked={parseInt(rating || "0") === r}
                    onChange={() => setRating(String(r))}
                    className="h-4 w-4"
                  />
                  <span className="ml-2 flex items-center space-x-1">
                    {[...Array(r)].map((_, i) => (
                      <i key={i} className="fa-solid fa-star text-yellow-500 text-lg"></i>
                    ))}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Filters;
