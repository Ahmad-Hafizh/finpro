"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import ProductCard from "./ProductCard";

interface ICarouselProduct {
  products: any[];
}

export const ProductCarousel: React.FC<ICarouselProduct> = ({ products }) => {
  return (
    <Carousel className="relative w-full" opts={{ align: "start" }}>
      <CarouselContent className="-ml-4 h-fit">
        {products.map((p: any, i: number) => (
          <CarouselItem
            className="h-full basis-1/2 rounded-xl pl-4 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            key={i}
          >
            <ProductCard {...p} product_image={p.product_img[0]} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="right-4 opacity-20 hover:opacity-100 disabled:hidden" />
      <CarouselPrevious className="left-4 opacity-20 hover:opacity-100 disabled:hidden" />
    </Carousel>
  );
};
