'use client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import React from 'react';
import ProductCard from './ProductCard';

export function ProductCarousel() {
  return (
    <Carousel className="w-full relative">
      <CarouselContent className="h-fit -ml-4">
        <CarouselItem className="h-full rounded-xl pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6">
          <ProductCard />
        </CarouselItem>
        <CarouselItem className="h-full rounded-xl pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6">
          <ProductCard />
        </CarouselItem>
        <CarouselItem className="h-full rounded-xl pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6">
          <ProductCard />
        </CarouselItem>
        <CarouselItem className="h-full rounded-xl pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6">
          <ProductCard />
        </CarouselItem>
        <CarouselItem className="h-full rounded-xl pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6">
          <ProductCard />
        </CarouselItem>
        <CarouselItem className="h-full rounded-xl pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6">
          <ProductCard />
        </CarouselItem>
      </CarouselContent>
      <CarouselNext className="right-4 opacity-20 hover:opacity-100 disabled:hidden" />
      <CarouselPrevious className="left-4 opacity-20  hover:opacity-100 disabled:hidden" />
    </Carousel>
  );
}
