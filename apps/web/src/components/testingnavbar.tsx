"use client";
import React, { useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/redux/store";
import { fetchCartCount } from "@/lib/redux/reducers/cartSlice";
import { useCart } from "@/contexts/CartContext";

const TestingNavbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartCount = useSelector((state: RootState) => state.cart.count);
  const { cartVersion } = useCart();

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       dispatch(fetchCartCount());
  //     }, 3000);

  //     return () => clearInterval(interval);
  //   }, [dispatch]);

  //   useEffect(() => {
  //     dispatch(fetchCartCount());
  //   }, [cartVersion, dispatch]);

  // update cartVersion
  useEffect(() => {
    dispatch(fetchCartCount());
  }, [cartVersion, dispatch]);

  // update tab
  useEffect(() => {
    const handleFocus = () => {
      dispatch(fetchCartCount());
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [dispatch]);

  return (
    <nav>
      <div className="flex justify-end p-4">
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-6 w-6 text-black" />
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 rounded-full bg-[#80ED99] px-2 py-1 text-xs font-medium text-black">
              {cartCount}
            </span>
          )}
        </Button>
      </div>
    </nav>
  );
};

export default TestingNavbar;
