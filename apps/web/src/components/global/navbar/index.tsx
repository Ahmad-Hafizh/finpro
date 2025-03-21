/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { callAPI } from "@/config/axios";
import { setStore } from "@/lib/redux/reducers/storeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchCartCount } from "@/lib/redux/reducers/cartSlice";
import { useCart } from "@/contexts/CartContext";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import { toast } from "@/hooks/use-toast";

const Navbar = () => {
  const pathName = usePathname();
  const { data: session } = useSession();
  const dispatch: any = useAppDispatch();
  const currStore = useAppSelector((state) => state.store);
  const cartCount = useAppSelector((state) => state.cart);
  const { cartVersion } = useCart();
  const [stores, setStores] = useState([]);

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

  const getAllStore = async () => {
    try {
      const response = await callAPI.get("/store");
      setStores(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const onSelectStore = async (storeName: string) => {
    try {
      const response = await callAPI.post("/store/get-store-by-name", {
        store_name: storeName,
      });

      dispatch(setStore(response.data.result));
      toast({
        title: "Switch Store",
        description: `switch store to ${response.data.result.store_name} success`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getCoords = (): Promise<
        { lat: number; lng: number } | undefined
      > => {
        return new Promise((resolve) => {
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
    getAllStore();
  }, []);

  useEffect(() => {
    if (session && session.user && session.user.auth_token) {
      dispatch(fetchCartCount({ token: session.user.auth_token }));
    }
  }, [cartVersion, dispatch, session]);

  useEffect(() => {
    const handleFocus = () => {
      if (session && session.user && session.user.auth_token) {
        dispatch(fetchCartCount({ token: session.user.auth_token }));
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [dispatch, session]);

  return (
    <div
      className={`${pathName.startsWith("/auth") ? "hidden" : "block"} fixed top-0 z-40 mx-auto w-full`}
    >
      {/* mobile */}
      <div
        className={`${pathName.startsWith("/admin") ? "hidden" : "block"} a h-20 w-full justify-center border-b bg-white px-[5%] md:hidden`}
      >
        <MobileNav
          stores={stores}
          pathName={pathName}
          store_name={currStore.store_name}
          user_name={session?.user.name}
          user_pfp={session?.user.image}
          onSelectStore={onSelectStore}
        />
      </div>

      {/* desktop */}
      <div
        className={`${pathName.startsWith("/admin") ? "hidden" : "md:block"} hidden h-20 w-full justify-center border-b bg-white px-[5%]`}
      >
        <DesktopNav
          stores={stores}
          store_name={currStore.store_name}
          cart_count={cartCount.count}
          user_name={session?.user.name}
          user_pfp={session?.user.image}
          onSelectStore={onSelectStore}
        />
      </div>
    </div>
  );
};

export default Navbar;
