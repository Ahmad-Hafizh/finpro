"use client";

import { usePathname } from "next/navigation";
import Botbar from "@/components/global/BottomBar";
import Navbar from "@/components/global/navbar";
import StoreProvider from "@/app/StoreProvider";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import SuspenseWrapper from "./SuspenseWrapper";
import { CartProvider } from "@/contexts/CartContext";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <SuspenseWrapper>
      <SessionProvider>
        <StoreProvider>
          <CartProvider>
            <Navbar />
            {isAdminRoute ? (
              children
            ) : (
              <div className="container relative mx-auto max-w-7xl px-[5%]">
                {children}
              </div>
            )}
            <Toaster />
            <Botbar />
          </CartProvider>
        </StoreProvider>
      </SessionProvider>
    </SuspenseWrapper>
  );
}
