"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { fetchCartItems, fetchCartCount } from "@/store/cartSlice";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  productId: number;
  productName: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  productId,
  productName,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { updateCart } = useCart();
  const router = useRouter();

  const handleAddToCart = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
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
        await Promise.all([
          dispatch(fetchCartItems()).unwrap(),
          dispatch(fetchCartCount()).unwrap(),
        ]);
        updateCart("add_item");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Something went wrong while adding the product to your cart.");
    } finally {
      setIsLoading(false);
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
          onChange={(e) =>
            setQuantity(Math.max(1, parseInt(e.target.value) || 1))
          }
          className="border rounded p-1 w-16"
          disabled={isLoading}
        />
        <button
          onClick={handleAddToCart}
          className={`px-4 py-2 bg-[#80ED99] text-black rounded hover:bg-[#60cd79] ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
