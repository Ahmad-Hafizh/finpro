// INI HANYA CONTOH
"use client";

import React from "react";
import TestNavbar from "../../components/testingnavbar";
import ProductCard from "../../components/ProductCard";

const products = [
  { productId: 1, productName: "Product 1" },
  { productId: 2, productName: "Product 2" },
];

export default function TestPage() {
  return (
    <>
      <TestNavbar />
      <main className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.productId} {...product} />
        ))}
      </main>
    </>
  );
}
