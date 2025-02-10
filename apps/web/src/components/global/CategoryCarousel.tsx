import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import React from 'react';

export function CategoryCarousel() {
  return (
    <Carousel
      className="w-full relative"
      opts={{
        align: 'start',
      }}
    >
      <CarouselContent className="h-fit flex gap-3 ml-1">
        <CarouselItem className="p-2 border rounded-full w-fit basis-auto">All categories</CarouselItem>
        <CarouselItem className="p-2 border rounded-full w-fit basis-auto">Raw meat</CarouselItem>
        <CarouselItem className="p-2 border rounded-full w-fit basis-auto">Seafood</CarouselItem>
        <CarouselItem className="p-2 border rounded-full w-fit basis-auto">Vegeatables</CarouselItem>
        <CarouselItem className="p-2 border rounded-full w-fit basis-auto">Fruits</CarouselItem>
      </CarouselContent>
      <CarouselNext className="right-4 opacity-20 hover:opacity-100 disabled:hidden" />
      <CarouselPrevious className="left-4 opacity-20  hover:opacity-100 disabled:hidden" />
    </Carousel>
  );
}
