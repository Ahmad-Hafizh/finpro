import React from 'react';
import { MapPin } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

const StorePick = () => {
  return (
    <div className="flex p-4 bg-gray-200 rounded-xl md:hidden justify-between">
      <div className="flex gap-1">
        {/* <p className="text-xs">Toko terdekat</p> */}
        <MapPin />
        <p className="text-xl leading-tight">Plaza Surabaya</p>
      </div>
      <div className="">
        <ChevronRight />
      </div>
    </div>
  );
};

export default StorePick;
