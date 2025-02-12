"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface CartContextType {
  cartVersion: number;
  //   lastAction: string | null;
  updateCart: (action?: string) => void;
}

const CartContext = createContext<CartContextType>({
  cartVersion: 0,
  //   lastAction: null,
  updateCart: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartVersion, setCartVersion] = useState<number>(() => {
    const stored = localStorage.getItem("cartVersion");
    return stored ? parseInt(stored, 10) : 0;
  });
  const [lastAction, setLastAction] = useState<string | null>(null);

  const updateCart = (action: string = "update") => {
    setCartVersion((prev) => {
      const newVersion = prev + 1;
      localStorage.setItem("cartVersion", newVersion.toString());
      return newVersion;
    });
    // setLastAction(action);
  };

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "cartVersion" && e.newValue) {
        setCartVersion(parseInt(e.newValue, 10));
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <CartContext.Provider value={{ cartVersion, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
