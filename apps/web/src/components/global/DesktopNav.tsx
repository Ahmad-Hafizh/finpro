"use client";
import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import Link from "next/link";
import { FiPackage } from "react-icons/fi";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { MapPin } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutAction } from "@/actions/signOutAction";

interface IDesktopNavProps {
  store_name: string;
  user_name?: string | null | undefined;
  cart_count: number;
}

const DesktopNav: React.FunctionComponent<IDesktopNavProps> = ({
  store_name,
  user_name,
  cart_count,
}) => {
  return (
    <div
      className={`hidden h-full w-full items-center justify-between gap-4 md:flex lg:gap-10`}
    >
      <div className="flex w-full items-center gap-10">
        <Link href="/">
          {/* <BiHomeSmile className="flex text-3xl" /> */}
          <p className="text-2xl font-bold">EGrocery</p>
        </Link>
        <div className="flex w-full gap-4">
          <div className="flex w-2/3 gap-2 rounded-lg border-2 p-2">
            <Search />
            <input type="text" placeholder="search" className="w-full" />
          </div>
          <div className="flex w-1/3 items-center gap-2 overflow-hidden text-nowrap rounded-lg border-2 px-2 py-1">
            <MapPin />
            <p className="capitalize">{store_name}</p>
          </div>
        </div>
      </div>
      <div className={`${user_name ? "flex" : "hidden"} gap-2`}>
        <div className="flex items-center justify-center gap-4 border-r-2 pr-4">
          <Link href="/cart" className="relative">
            <IoCartOutline className="text-3xl" />
            {cart_count > 0 && (
              <span className="absolute -right-1 -top-1 rounded-full bg-[#80ED99] px-1 text-sm font-medium text-black">
                {cart_count}
              </span>
            )}
          </Link>
          <Link href="/order">
            <FiPackage className="text-3xl" />
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex gap-2">
            <MdOutlineAccountCircle className="text-3xl" />
            <p className="text-xl">{user_name}</p>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link href="/setting/account">Setting</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button onClick={signOutAction}>Sign Out</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className={`${user_name ? "hidden" : "flex"} gap-2`}>
        <Link href="/auth/signin">
          <Button>Sign In</Button>
        </Link>
        <Link href="/auth/signup">
          <Button>Sign Up</Button>
        </Link>
      </div>
    </div>
  );
};

export default DesktopNav;
