"use client";
import React from "react";
import { MapPin } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useAppSelector } from "@/lib/redux/hooks";

const StorePick = () => {
  const currStore = useAppSelector((state) => state.store);
  return (
    <div className="flex justify-between rounded-xl bg-gray-200 p-4 md:hidden">
      <div className="flex gap-1">
        {/* <p className="text-xs">Toko terdekat</p> */}
        <MapPin />
        <p className="text-xl leading-tight">{currStore.store_name}</p>
      </div>
      <div className="">
        <ChevronRight />
      </div>
    </div>
  );
};

export default StorePick;
