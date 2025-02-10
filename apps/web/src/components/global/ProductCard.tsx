import React from 'react';
import { Button } from '../ui/button';

const ProductCard = () => {
  return (
    <div className="h-[30vh] md:h-[35vh] lg:h-[40vh] border border-gray-400 rounded-xl flex flex-col justify-start items-center px-4 pt-4 pb-6">
      <div className=" w-full h-2/3 "></div>
      <div className=" w-full h-1/3 flex flex-col justify-between">
        <div>
          <p className="text-lg font-semibold">Product Name</p>
          <p className=" text-gray-400">100 ml</p>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-lg">$1,00</p>
          <Button className="rounded-full text-xl py-1 px-2">+</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
