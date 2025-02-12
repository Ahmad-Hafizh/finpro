"use client";
import React, { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import Link from "next/link";
import { BiHomeSmile } from "react-icons/bi";
import { FiPackage } from "react-icons/fi";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (pathName == "/") {
      setIsVisible(true);
    }
  }, [pathName]);
  return (
    <div
      className={`${isVisible ? "block" : "hidden"} fixed top-0 z-50 h-20 w-full border-b bg-white px-[5%]`}
    >
      <div className="flex h-full items-center justify-between gap-4">
        <div>
          <BiHomeSmile className="hidden text-3xl md:flex" />
          <div className="md:hidden">
            <p className="text-xs">Welcome back,</p>
            <p className="text-xl leading-tight">User Name</p>
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
          <IoCartOutline className="text-3xl" />
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
