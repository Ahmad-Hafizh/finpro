// INI HANYA CONTOH

"use client";
import React, { useEffect, useState } from "react";
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const TestNavbar: React.FC = () => {
  const [cartCount, setCartCount] = useState<number>(0);

  const fetchCartCount = async () => {
    try {
      const res = await fetch("http://localhost:8090/cart/count");
      const data = await res.json();
      if (res.ok) {
        setCartCount(data.count);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-6 w-6 text-black" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#80ED99] text-black text-xs font-medium px-2 py-1 rounded-full">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TestNavbar;
