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

const Navbar = () => {
  const pathName = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const { data: session } = useSession();
  const splitPath = pathName.split("/");
  const currentPath = splitPath[splitPath.length - 1].replace("-", " ");
  const dispatch: any = useAppDispatch();
  const currStore = useAppSelector((state) => state.store);
  const cartCount = useAppSelector((state) => state.cart);
  const { cartVersion } = useCart();

  useEffect(() => {
    setIsVisible(pathName == "/" ? true : false);
  }, [pathName]);

  const getNearestStore = async (latitude?: number, longitude?: number) => {
    try {
      if (latitude && longitude) {
        const response = await callAPI.get(
          `/store/get-store?lat=${latitude}&lng=${longitude}`,
        );
        dispatch(setStore(response.data.result));
      } else {
        const response = await callAPI.get(`/store/get-store`);
        dispatch(setStore(response.data.result));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getCoords = (): Promise<
        { lat: number; lng: number } | undefined
      > => {
        return new Promise((resolve, reject) => {
          window.navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            (error) => {
              console.log(error);
              resolve(undefined);
            },
          );
        });
      };

      getCoords().then((coords) => {
        if (coords) {
          getNearestStore(coords.lat, coords.lng);
        } else if (!coords) {
          getNearestStore();
        }
      });
    }
  }, []);

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

  return (
    <div
      className={`${pathName.startsWith("/auth") ? "hidden" : "flex"} fixed top-0 z-50 mx-auto h-20 w-full justify-center border-b bg-white px-[5%]`}
    >
      {/* mobile */}
      <div className="h-full w-full md:hidden">
        {isVisible ? (
          <div className="flex h-full w-full items-center justify-between gap-4 md:hidden">
            <div>
              <BiHomeSmile className="hidden text-3xl md:flex" />
              <div className="md:hidden">
                <p className="text-xs">Welcome back,</p>
                <p className="text-xl leading-tight">{session?.user?.name}</p>
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
            <p className="text-2xl capitalize">{currentPath}</p>
          </div>
        )}
      </div>

      {/* desktop */}
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
              <p className="capitalize">{currStore.store_name}</p>
            </div>
          </div>
        </div>
        <div className={`${session?.user ? "flex" : "hidden"} gap-2`}>
          <div className="flex items-center justify-center gap-4 border-r-2 pr-4">
            <Link href="/cart" className="relative">
              <IoCartOutline className="text-3xl" />
              {cartCount.count > 0 && (
                <span className="absolute -right-1 -top-1 rounded-full bg-[#80ED99] px-1 text-sm font-medium text-black">
                  {cartCount.count}
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
              <p className="text-xl">{session?.user?.name}</p>
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
        <div className={`${session?.user ? "hidden" : "flex"} gap-2`}>
          <Link href="/auth/signin">
            <Button>Sign In</Button>
          </Link>
          <Link href="/auth/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
