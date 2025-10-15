"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Button from "./Button";
import Reviews from "./Reviews";

const ProductDetails = ({ product }) => {
  const imgRef = useRef(null);
  const inStock = true;

  return (
      <section className="bg-white py-10">
        
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-5">
            {/* === PRODUCT IMAGE === */}
            <aside>
              <div className="border border-gray-200 shadow-sm rounded mb-5 w-full h-[340px] overflow-hidden flex items-center justify-center">
                <Image
                  ref={imgRef}
                  src={product?.image_url ?? "/images/default_product.png"}
                  alt={product?.name ?? "Product image"}
                  width={340}
                  height={340}
                  className="object-cover w-full h-full"
                />
              </div>
            </aside>
            {/* === PRODUCT DETAILS === */}
            <main>
              <h2 className="font-semibold text-2xl mb-4">{product?.name}</h2>

              {/* === STAR RATING === */}
              <div className="flex flex-wrap items-center space-x-2 mb-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fa-star text-sm ${
                        i < Math.floor(product?.rating ?? 0)
                          ? "fa-solid text-yellow-500"
                          : "fa-regular text-gray-300"
                      }`}
                    ></i>
                  ))}
                </div>
                <span className="text-yellow-500">{product?.rating}</span>

                <svg
                  width="6px"
                  height="6px"
                  viewBox="0 0 6 6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="3" cy="3" r="3" fill="#DBDBDB" />
                </svg>

                <span className="text-green-500">Verified</span>
              </div>

              <p className="mb-4 font-semibold text-xl">${product?.price}</p>

              <p className="mb-4 text-gray-500">{product?.description}</p>

              {/* === ADD TO CART BUTTON === */}
              <div className="flex flex-wrap gap-2 mb-5">
                <Button>
                  Add to cart
                </Button>
              </div>

              {/* === PRODUCT INFO === */}
              <ul className="mb-5">
                <li className="mb-1">
                  <b className="font-medium w-36 inline-block">Stock:</b>
                  {inStock ? (
                    <span className="text-green-500">In Stock</span>
                  ) : (
                    <span className="text-red-500">Out of Stock</span>
                  )}
                </li>
                <li className="mb-1">
                  <b className="font-medium w-36 inline-block">Category:</b>
                  <span className="text-gray-500">{product?.category}</span>
                </li>
                <li className="mb-1">
                  <b className="font-medium w-36 inline-block">
                    Seller / Brand:
                  </b>
                  <span className="text-gray-500">{product?.artisan}</span>
                </li>
              </ul>
            </main>
          </div>

          <hr className="my-8" />

          <div className="font-semibold">
            <h1 className="text-gray-500 review-title mb-6 mt-10 text-2xl">
              Customers Reviews
            </h1>
             <Reviews product_id={product.product_id}/>
          </div>
        </div>
      </section>
  );
};

export default ProductDetails;
