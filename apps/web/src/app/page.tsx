'use client';
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

  console.log(lat, lng);

  return (
    <div className="container mx-auto flex flex-col gap-6">
      <div className="mx-[5%] md:px-0 mt-4 rounded-xl overflow-hidden">
        <LargeCarousel />
      </div>
      <div className="mx-[5%] flex flex-col gap-2">
        <div className="flex justify-between w-full">
          <p className="text-lg md:text-xl">Todays choice</p>
          <Link href="/search">see all</Link>
        </div>
        <ProductCarousel />
      </div>
    </div>
  );
}
