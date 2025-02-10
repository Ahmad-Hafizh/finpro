'use client';
import { CategoryCarousel } from '@/components/global/CategoryCarousel';
import { LargeCarousel } from '@/components/global/LargeCarousel';
import { ProductCarousel } from '@/components/global/ProductCarousel';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      });
    }
  }, []);

  return (
    <div className="container mx-auto flex flex-col gap-6 px-[5%] py-4">
      <div className="md:px-0 rounded-xl overflow-hidden">
        <LargeCarousel />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-lg md:text-xl">Categories</p>
        <CategoryCarousel />
      </div>
      <div className=" flex flex-col gap-2">
        <div className="flex justify-between w-full">
          <p className="text-lg md:text-xl">Todays choice</p>
          <Link href="/search">see all</Link>
        </div>
        <ProductCarousel />
      </div>
    </div>
  );
}
