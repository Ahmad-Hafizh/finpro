'use client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import React from 'react';
import { type CarouselApi } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export function LargeCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel setApi={setApi} plugins={[plugin.current]} className="w-full relative" onMouseEnter={plugin.current.stop} onMouseLeave={plugin.current.reset} opts={{ loop: true }}>
      <CarouselContent className="h-[27vh] lg:h-[40vh] -ml-4">
        <CarouselItem className="h-full rounded-xl pl-4">
          <div className="h-full bg-gray-300 rounded-xl flex justify-center items-center">1</div>
        </CarouselItem>
        <CarouselItem className="h-full rounded-xl pl-4">
          <div className="h-full bg-gray-300 rounded-xl flex justify-center items-center">2</div>
        </CarouselItem>
        <CarouselItem className="h-full rounded-xl pl-4">
          <div className="h-full bg-gray-300 rounded-xl flex justify-center items-center">3</div>
        </CarouselItem>
      </CarouselContent>
      <div className="flex gap-2 w-full items-center justify-center absolute bottom-5">
        {Array.from({ length: count }).map((e, i) => (
          <div className={`${current - 1 == i ? 'w-5 opacity-100' : 'w-2 opacity-20'} h-2 bg-white rounded-full`} key={i}></div>
        ))}
      </div>
      <CarouselNext className="right-4 opacity-20 hover:opacity-100" />
      <CarouselPrevious className="left-4 opacity-20  hover:opacity-100" />
    </Carousel>
  );
}
