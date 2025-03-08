import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Botbar from "@/components/global/BottomBar";
import Navbar from "@/components/global/navbar";
import StoreProvider from "@/app/StoreProvider";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import SuspenseWrapper from "./SuspenseWrapper";
import { CartProvider } from "@/contexts/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EGrosir",
  description: "your online all needs store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SuspenseWrapper>
          <SessionProvider>
            <StoreProvider>
              <CartProvider>
                <Navbar />
                <div className="container relative mx-auto max-w-7xl px-[5%]">
                  {children}
                </div>
                <Toaster />
                <Botbar />
              </CartProvider>
            </StoreProvider>
          </SessionProvider>
        </SuspenseWrapper>
      </body>
    </html>
  );
}
