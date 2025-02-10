// INI HANYA CONTOH
"use client";
import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const TestNavbar: React.FC = () => {
  const [cartCount, setCartCount] = useState<number>(0);

  const fetchCartCount = async () => {
    try {
      const res = await fetch("http://localhost:8090/cart/count");
      const data = await res.json();
      if (res.ok) {
        console.log("Fetched cart count:", data.count);
        setCartCount(data.count);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchCartCount();
    const handleCartUpdated = () => {
      console.log("Received cartUpdated event in navbar");
      fetchCartCount();
    };
    window.addEventListener("cartUpdated", handleCartUpdated);
    return () => window.removeEventListener("cartUpdated", handleCartUpdated);
  }, []);

  return (
    <nav>
      <div className="flex justify-end p-4">
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-6 w-6 text-black" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#80ED99] text-black text-xs font-medium px-2 py-1 rounded-full">
              {cartCount}
            </span>
          )}
        </Button>
      </div>
    </nav>
  );
};

export default TestNavbar;
