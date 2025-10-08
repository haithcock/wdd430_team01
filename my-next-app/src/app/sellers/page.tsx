import React from "react";
import { sellers } from "../data/sellers";

export default function SellersPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Sellers</h1>
      <ul className="space-y-4">
        {sellers.map((seller) => (
          <li key={seller.id} className="border rounded-lg p-4 shadow">
            <h2 className="text-xl font-semibold">{seller.name}</h2>
            <p>Rating: {seller.rating}</p>
            <p>Products: {Array.isArray(seller.products) ? seller.products.join(", ") : seller.products}</p>
            <p>Location: {seller.location}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
