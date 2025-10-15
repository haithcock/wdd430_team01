"use client";

import React, { useEffect, useState } from "react";
import Button from "./Button";

interface Review {
  product_id: number;
  review_id: number;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function Reviews({ product_id }: { product_id: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch reviews from API
  async function fetchReviews() {
    try {
      const res = await fetch(`/api/reviews/${product_id}`);
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchReviews();
  }, [product_id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id, rating, comment }),
      });

      if (!res.ok) throw new Error("Failed to add review");

      setComment("");
      fetchReviews(); // Refresh the reviews list
    } catch (err) {
      console.error(err);
      alert("Error adding review");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6">
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet. Be the first!</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((r) => (
            // <li key={r.review_id} className="p-3 rounded-lg">
            //   <div className="flex justify-between">
            //     <span className="font-small text-gray-400">{r.user_name}</span>
            //     <div className="flex items-center space-x-1">
            //       {[...Array(5)].map((_, i) => (
            //         <i
            //           key={i}
            //           className={`fa-star text-sm ${
            //             i < Math.floor(r.rating) ? "fa-solid text-yellow-500" : "fa-regular text-gray-300"
            //           }`}
            //         ></i>
            //       ))}
            //     </div>
            //   </div>
            //   <p className="text-gray-700">{r.comment}</p>
            //   <small className="text-gray-400">
            //     {new Date(r.created_at).toLocaleString()}
            //   </small>
            // </li>
            <li
                key={r.review_id}
                className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-4"
                >
                {/* Rating stars */}
                <div className="flex items-center mb-2 space-x-1 rtl:space-x-reverse">
                    {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-4 h-4 ${
                        i < Math.floor(r.rating)
                            ? "text-yellow-300"
                            : "text-gray-300 dark:text-gray-500"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                    >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    ))}
                </div>

                {/* Comment text */}
                <p className="mb-2 text-gray-700 dark:text-gray-300 leading-relaxed">
                    {r.comment}
                </p>

                {/* Name and date */}
                <footer className="text-sm text-gray-500 dark:text-gray-400">
                    <p>
                    — <span className="font-medium text-gray-900 dark:text-gray-100">{r.user_name}</span>{" "}
                    on{" "}
                    <time dateTime={r.created_at}>
                        {new Date(r.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        })}
                    </time>
                    </p>
                </footer>
                </li>
          ))}
        </ul>
      )}

      {/* <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <h4 className="font-semibold">Leave a Review</h4>

        <label>
          Rating:
          <select
            className="border ml-2 p-1 rounded"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </label>

        <textarea
          className="w-full border p-2 rounded"
          rows={3}
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Review"}
        </Button>
      </form> */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-5"
        >
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Leave a Review
        </h4>

        {/* Rating Select */}
        <div>
            <label
            htmlFor="rating"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
            Rating
            </label>
            <select
            id="rating"
            className="block w-28 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            >
            {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                {r} Star{r > 1 && "s"}
                </option>
            ))}
            </select>
        </div>

        {/* Comment Textarea */}
        <div>
            <label
            htmlFor="comment"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
            Your Review
            </label>
            <textarea
            id="comment"
            className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            rows={4}
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            />
        </div>

        {/* Submit Button */}
        <div>
            <Button
            type="submit"
            disabled={loading}
            className="w-fit pr-2 pl-2"
            >
            {loading ? "Submitting..." : "Submit Review"}
            </Button>
        </div>
        </form>
    </div>
  );
}
