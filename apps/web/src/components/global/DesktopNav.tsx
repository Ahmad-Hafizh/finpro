"use client";
import React from "react";
import { IoCartOutline } from "react-icons/io5";
import Link from "next/link";
import { MapPin, Package, Search } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutAction } from "@/actions/signOutAction";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IDesktopNavProps {
  store_name: string;
  user_name?: string | null | undefined;
  cart_count: number;
  user_pfp: string | null | undefined;
}

const DesktopNav: React.FunctionComponent<IDesktopNavProps> = ({
  store_name,
  user_name,
  cart_count,
  user_pfp,
}) => {
  return (
    <div
      className={`hidden h-full w-full items-center justify-between gap-4 md:flex lg:gap-10`}
    >
      <div className="flex w-full items-center gap-10">
        <Link href="/" className="flex items-center">
          <Image
            src="/logofinpro.png"
            width={40}
            height={40}
            sizes="512"
            alt="greeneries logo"
          />
          <p className="text-2xl font-bold">reeneries</p>
        </Link>
        <div className="flex w-full gap-4">
          <div className="relative flex w-2/3 items-center">
            <Search className="absolute left-2 h-4 w-4" />
            <input
              type="text"
              placeholder="search"
              className="w-full rounded-md border py-1 pl-8 pr-3"
            />
          </div>
          <Select defaultValue="nearest">
            <SelectTrigger className="w-1/3">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nearest">{store_name}</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
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
            <Package />
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 overflow-hidden px-2">
            <Avatar>
              <AvatarImage src={user_pfp || ""} />
              <AvatarFallback>{user_name?.slice(0, 2)}</AvatarFallback>
            </Avatar>

            <p className="text-nowrap text-lg">{user_name?.split(" ")[0]}</p>
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
