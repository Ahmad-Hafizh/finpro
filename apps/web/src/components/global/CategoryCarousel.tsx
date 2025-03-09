/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
import React from "react";

interface ICategoryCarousel {
  categories: any[];
}

export const CategoryCarousel: React.FC<ICategoryCarousel> = ({
  categories,
}) => {
  const router = useRouter();
  return (
    <Carousel
      className="relative w-full"
      opts={{
        align: "start",
      }}
    >
      <CarouselContent className="ml-1 flex h-fit gap-3">
        {categories.map((e: any, i) => (
          <CarouselItem
            className="w-fit basis-auto cursor-pointer rounded-full border px-4 py-2"
            key={i}
            onClick={() =>
              router.push(`/explore?cat=${encodeURI(e.product_category_name)}`)
            }
          >
            {e.product_category_name}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="right-4 opacity-20 hover:opacity-100 disabled:hidden" />
      <CarouselPrevious className="left-4 opacity-20 hover:opacity-100 disabled:hidden" />
    </Carousel>
  );
};
