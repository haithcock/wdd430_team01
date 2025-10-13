"use client";
import { useState, useEffect } from "react";
import Button from "./Button";
import { useRouter, useSearchParams } from "next/navigation";

const Filters = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categories, setCategories] = useState<{ id: number; title: string }[]>([]);

  const searchParams = useSearchParams();
  const router = useRouter();

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

  const getFilter = (filterType: string) => {
    return searchParams.get(filterType);
  }
  const setFilter = (filterType: string, value: string, checked: boolean) => {
    let params = searchParams.get(filterType)?.split(",").filter(item => item != '') ?? [];
    if (checked) {
      params.push(value);
    } else {
      params = params.filter(item => item != value);
    }

    let newParams = new URLSearchParams(searchParams.toString());
    newParams.set(filterType, params.join(","));
    router.push(`?${newParams.toString()}`);

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
                    defaultChecked={cat.title === getFilter("categories")}
                    className="h-4 w-4"
                    onChange={e => setFilter("categories", e.target.value, e.target.checked)}
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
                defaultChecked={rating + '' === (getFilter("ratings"))}
                className="h-4 w-4"
                onChange={e => setFilter("ratings", e.target.value, e.target.checked)}
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
