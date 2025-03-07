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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface IMobileNavProps {
  store_name: string;
  user_name?: string | null | undefined;
  user_pfp?: string | null | undefined;
}

const MobileNav: React.FunctionComponent<IMobileNavProps> = ({
  user_name,
  store_name,
  user_pfp,
}) => {
  const isVisible = true;
  return (
    <div className="h-full w-full md:hidden">
      {isVisible ? (
        <div className="flex h-full w-full items-center justify-between gap-4">
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src={user_pfp || ""} />
              <AvatarFallback>{user_name?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm text-gray-500">Deliver from :</p>
              <p className="text-l leading-tight">{store_name}</p>
            </div>
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
