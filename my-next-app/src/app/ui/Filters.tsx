// "use client";
// import StarRatings from "react-star-ratings";

// const Filters = () => {
//   let queryParams;

//   function checkHandler(checkBoxType, checkBoxValue) {
//     if (typeof window !== "undefined") {
//       queryParams = new URLSearchParams(window.location.search);
//     }

//     if (typeof window !== "undefined") {
//       const value = queryParams.get(checkBoxType);
//       if (checkBoxValue === value) return true;
//       return false;
//     }
//   }

//   return (
//     <aside className="md:w-1/3 lg:w-1/4 px-4">
//       <a
//         className="md:hidden mb-5  w-full text-center px-4 py-2 inline-block text-lg text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
//         href="#"
//       >
//         Filter by
//       </a>
//       <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
//         <h3 className="font-semibold mb-2">Price ($)</h3>
//         <div className="grid md:grid-cols-3 gap-x-2">
//           <div className="mb-4">
//             <input
//               name="min"
//               className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
//               type="number"
//               placeholder="Min"
//             />
//           </div>

//           <div className="mb-4">
//             <input
//               name="max"
//               className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
//               type="number"
//               placeholder="Max"
//             />
//           </div>

//           <div className="mb-4">
//             <button className="px-1 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
//               Go
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
//         <h3 className="font-semibold mb-2">Category</h3>

//         <ul className="space-y-1">
//           <li>
//             <label className="flex items-center">
//               <input
//                 name="category"
//                 type="checkbox"
//                 value="Electronics"
//                 className="h-4 w-4"
//                 defaultChecked={checkHandler("category", "Electronics")}
//               />
//               <span className="ml-2 text-gray-500"> Electronics </span>
//             </label>
//           </li>
//           <li>
//             <label className="flex items-center">
//               <input
//                 name="category"
//                 type="checkbox"
//                 value="Laptops"
//                 className="h-4 w-4"
//                 defaultChecked={checkHandler("category", "Laptops")}
//               />
//               <span className="ml-2 text-gray-500"> Laptops </span>
//             </label>
//           </li>
//           <li>
//             <label className="flex items-center">
//               <input
//                 name="category"
//                 type="checkbox"
//                 value="Toys"
//                 className="h-4 w-4"
//                 defaultChecked={checkHandler("category", "Toys")}
//               />
//               <span className="ml-2 text-gray-500"> Toys </span>
//             </label>
//           </li>
//           <li>
//             <label className="flex items-center">
//               <input
//                 name="category"
//                 type="checkbox"
//                 value="Office"
//                 className="h-4 w-4"
//                 defaultChecked={checkHandler("category", "Office")}
//               />
//               <span className="ml-2 text-gray-500"> Office </span>
//             </label>
//           </li>
//           <li>
//             <label className="flex items-center">
//               <input
//                 name="category"
//                 type="checkbox"
//                 value="Beauty"
//                 className="h-4 w-4"
//                 defaultChecked={checkHandler("category", "Beauty")}
//               />
//               <span className="ml-2 text-gray-500"> Beauty </span>
//             </label>
//           </li>
//         </ul>

//         <hr className="my-4" />

//         <h3 className="font-semibold mb-2">Ratings</h3>
//         <ul className="space-y-1">
//           <li>
//             {[5, 4, 3, 2, 1].map((rating) => (
//               <label key={rating} className="flex items-center">
//                 <input
//                   name="ratings"
//                   type="checkbox"
//                   value={rating}
//                   className="h-4 w-4"
//                   defaultChecked={checkHandler("ratings", `${rating}`)}
//                 />
//                 <span className="ml-2 text-gray-500">
//                   {" "}
//                   <StarRatings
//                     rating={5}
//                     starRatedColor="#ffb829"
//                     numberOfStars={5}
//                     starDimension="20px"
//                     starSpacing="2px"
//                     name="rating"
//                   />{" "}
//                 </span>
//               </label>
//             ))}
//           </li>
//         </ul>
//       </div>
//     </aside>
//   );
// };

// export default Filters;

"use client";
import React, { useState } from "react";
import Button from "./Button";

const Filters = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categories, setCategories] = React.useState<{ id: number; title: string }[]>([]);

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

  function checkHandler(checkBoxType: string, checkBoxValue: string) {
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search);
      const value = queryParams.get(checkBoxType);
      return checkBoxValue === value;
    }
    return false;
  }

  return (
    <aside className="w-full md:w-1/5 mb-8 md:mb-0">
      {/* Mobile Filter Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden mb-4 w-full text-center px-4 py-2 inline-block text-lg text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
      >
        {mobileOpen ? "Close Filters" : "Filter by"}
      </button>

      {/* Filters container */}
      <div
        className={`bg-white rounded shadow-sm border border-gray-200 p-6 space-y-6
          ${mobileOpen ? "block" : "hidden"} md:block`}
      >
        {/* Price */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-700">Price ($)</h3>
          <div className="grid grid-cols-3 gap-2">
            <input
              name="min"
              type="number"
              placeholder="Min"
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 w-full focus:outline-none focus:border-gray-400 hover:border-gray-400"
            />
            <input
              name="max"
              type="number"
              placeholder="Max"
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
                    type="checkbox"
                    value={cat.title}
                    defaultChecked={checkHandler("category", cat.title)}
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
        {[5, 4, 3, 2, 1].map((rating) => (
            <li key={rating}>
            <label className="flex items-center cursor-pointer">
                <input
                name="ratings"
                type="checkbox"
                value={rating}
                defaultChecked={checkHandler("ratings", `${rating}`)}
                className="h-4 w-4"
                />
                <span className="ml-2 flex items-center space-x-1">
                {[...Array(rating)].map((_, i) => (
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
