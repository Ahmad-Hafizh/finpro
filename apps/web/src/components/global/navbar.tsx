import React from 'react';
import { IoCartOutline } from 'react-icons/io5';

const Navbar = () => {
  return (
    <div className="w-full h-12 border-b border-black px-[5%] ">
      <div className="flex justify-between items-center h-full gap-4">
        <p>Logo</p>
        <input type="text" placeholder="search" className="w-full border px-2 py-1 rounded-sm border-black" />
        <IoCartOutline className="text-3xl" />
      </div>
    </div>
  );
};

export default Navbar;
