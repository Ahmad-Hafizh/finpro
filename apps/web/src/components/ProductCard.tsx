// INI HANYA CONTOH

"use client";

import React, { useState } from "react";

interface ProductCardProps {
  productId: number;
  productName: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  productId,
  productName,
}) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = async () => {
    try {
      const res = await fetch("http://localhost:8090/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          quantity: quantity,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log("Product added, dispatching cartUpdated event");
        window.dispatchEvent(new Event("cartUpdated"));
        alert("Product added to cart!");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Something went wrong while adding the product to your cart.");
    }
  };

  return (
    <div className="border p-4 rounded shadow-sm">
      <h3 className="text-xl font-medium">{productName}</h3>
      <div className="flex items-center space-x-2 mt-2">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="border rounded p-1 w-16"
        />
        <button
          onClick={handleAddToCart}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
