"use client";
import React, { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import Link from "next/link";
import { BiHomeSmile } from "react-icons/bi";
import { FiPackage } from "react-icons/fi";
import { Pencil, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { callAPI } from "@/config/axios";
import { setStore } from "@/lib/redux/reducers/storeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { FaArrowLeft } from "react-icons/fa";
import { MapPin } from "lucide-react";
import { fetchCartCount } from "@/lib/redux/reducers/cartSlice";
import { useCart } from "@/contexts/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutAction } from "@/actions/signOutAction";
import Image from "next/image";

interface IMobileNavProps {
  store_name: string;
  user_image?: string | null | undefined;
}

const MobileNav: React.FunctionComponent<IMobileNavProps> = ({
  user_image,
  store_name,
}) => {
  const isVisible = true;
  return (
    <div className="h-full w-full md:hidden">
      {isVisible ? (
        <div className="flex h-full w-full items-center justify-between gap-4 md:hidden">
          <div>
            {user_image ? (
              <div
                className={`${user_image ? "block" : "hidden"} relative h-10 w-10 overflow-hidden rounded-full`}
              >
                <Image fill src={user_image} alt="user profile picture" />
              </div>
            ) : (
              <BiHomeSmile
                className={`${user_image ? "hidden" : "block"} text-3xl md:flex`}
              />
            )}
          </div>
          <div
            className={`flex w-1/2 items-center justify-between gap-2 rounded-full bg-gray-200 p-2`}
          >
            <div className="flex items-center justify-start gap-1 pl-2">
              <MapPin className="h-5 w-5" />
              <p className="text-xl">{store_name}</p>
            </div>
            <Link
              href="/change-store"
              className="aspect-square h-full rounded-full bg-white p-2"
            >
              <Pencil className="h-4 w-4" />
            </Link>
          </div>
          <div>
            <Search />
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center gap-2">
          <Link
            href="/order"
            className="flex-col items-center justify-start gap-1"
          >
            <Button
              className="space-y-0 hover:bg-transparent"
              variant={"ghost"}
            >
              <FaArrowLeft className="text-3xl" />
            </Button>
          </Link>
          <p className="text-2xl capitalize">Hom</p>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
