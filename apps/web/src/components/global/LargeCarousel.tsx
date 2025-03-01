"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import { type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function LargeCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  );

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      plugins={[plugin.current]}
      className="relative w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{ loop: true }}
    >
      <CarouselContent className="-ml-4 h-[27vh] md:h-[35vh] lg:h-[40vh]">
        <CarouselItem className="h-full rounded-xl pl-4">
          <div className="flex h-full items-center justify-center rounded-xl bg-gray-300">
            1
          </div>
        </CarouselItem>
        <CarouselItem className="h-full rounded-xl pl-4">
          <div className="flex h-full items-center justify-center rounded-xl bg-gray-300">
            2
          </div>
        </CarouselItem>
        <CarouselItem className="h-full rounded-xl pl-4">
          <div className="flex h-full items-center justify-center rounded-xl bg-gray-300">
            3
          </div>
        </CarouselItem>
      </CarouselContent>
      <div className="absolute bottom-5 flex w-full items-center justify-center gap-2">
        {Array.from({ length: count }).map((e, i) => (
          <div
            className={`${current - 1 == i ? "w-5 opacity-100" : "w-2 opacity-20"} h-2 rounded-full bg-white`}
            key={i}
          ></div>
        ))}
      </div>
      <CarouselNext className="right-4 opacity-20 hover:opacity-100" />
      <CarouselPrevious className="left-4 opacity-20 hover:opacity-100" />
    </Carousel>
  );
}
