"use client";
import React, { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import Link from "next/link";
import { BiHomeSmile } from "react-icons/bi";
import { FiPackage } from "react-icons/fi";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";

// tambahan------------
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchCartCount } from "@/store/cartSlice";
import { useCart } from "@/contexts/CartContext";
// ------------------------------------------------------

const Navbar = () => {
  const pathName = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const { data: session } = useSession();
  const splitPath = pathName.split("/");
  const currentPath = splitPath[splitPath.length - 1].replace("-", " ");

  useEffect(() => {
    setIsVisible(pathName == "/" ? true : false);
  }, [pathName]);

  // tambahan ----------------
  const dispatch = useDispatch<AppDispatch>();
  const cartCount = useSelector((state: RootState) => state.cart.count);
  const { cartVersion } = useCart();

  useEffect(() => {
    dispatch(fetchCartCount());
  }, [cartVersion, dispatch]);

  useEffect(() => {
    const handleFocus = () => {
      dispatch(fetchCartCount());
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [dispatch]);
  // ------------------------------------------------

  return (
    <div className={`fixed top-0 z-50 h-20 w-full border-b bg-white px-[5%]`}>
      {/* mobile */}
      {isVisible ? (
        <div className="flex h-full items-center justify-between gap-4 md:hidden">
          <div>
            <BiHomeSmile className="hidden text-3xl md:flex" />
            <div className="md:hidden">
              <p className="text-xs">Welcome back,</p>
              <p className="text-xl leading-tight">{session?.user?.name}</p>
            </div>
          </div>
          <div className="md:hidden">
            <Search />
          </div>
          <div className="hidden gap-4 md:flex">
            <input
              type="text"
              placeholder="search"
              className="w-full rounded-full border border-gray-500 px-2 py-1"
            />
            <p className="hidden text-nowrap md:flex">Plaza Surabaya</p>
          </div>
          <div className="hidden gap-4 md:flex">
            {/* tambahan --------------- */}
            <div className="relative">
              <IoCartOutline className="text-3xl" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 rounded-full bg-[#80ED99] px-2 py-1 text-xs font-medium text-black">
                  {cartCount}
                </span>
              )}
            </div>
            {/* ------------------ */}
            <Link
              href="/order"
              className="flex-col items-center justify-start gap-1"
            >
              <FiPackage className="text-3xl" />
            </Link>
            <Link
              href="setting"
              className="flex flex-col items-center justify-start gap-1"
            >
              <MdOutlineAccountCircle className="text-3xl" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-start gap-4 md:hidden">
          <Button className="space-y-0 bg-transparent p-0 text-black shadow-none hover:bg-transparent">
            -
          </Button>
          <p className="text-2xl capitalize">{currentPath}</p>
        </div>
      )}

      {/* desktop */}
      <div className="hidden h-full items-center justify-between gap-4 md:flex">
        <div>
          <BiHomeSmile className="hidden text-3xl md:flex" />
          <div className="md:hidden">
            <p className="text-xs">Welcome back,</p>
            <p className="text-xl leading-tight">{session?.user?.name}</p>
          </div>
        </div>
        <div className="md:hidden">
          <Search />
        </div>
        <div className="hidden gap-4 md:flex">
          <input
            type="text"
            placeholder="search"
            className="w-full rounded-full border border-gray-500 px-2 py-1"
          />
          <p className="hidden text-nowrap md:flex">Plaza Surabaya</p>
        </div>
        <div className="hidden gap-4 md:flex">
          {/* tambahan --------------------- */}
          <div className="relative">
            <IoCartOutline className="text-3xl" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 rounded-full bg-[#80ED99] px-2 py-1 text-xs font-medium text-black">
                {cartCount}
              </span>
            )}
          </div>
          {/* ------------------------ */}
          <Link
            href="/order"
            className="flex-col items-center justify-start gap-1"
          >
            <FiPackage className="text-3xl" />
          </Link>
          <Link
            href="setting"
            className="flex flex-col items-center justify-start gap-1"
          >
            <MdOutlineAccountCircle className="text-3xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
