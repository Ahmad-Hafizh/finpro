import React from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { MdOutlineAccountCircle } from 'react-icons/md';
import Link from 'next/link';
import { BiHomeSmile } from 'react-icons/bi';

const Navbar = () => {
  return (
    <div className="w-full h-16 border-b-2 px-[5%] ">
      <div className="flex justify-between items-center h-full gap-4">
        <BiHomeSmile className="text-3xl" />
        <input type="text" placeholder="search" className="w-full border px-2 py-1 rounded-sm border-gray-500" />
        <IoCartOutline className="text-3xl" />
        <Link href="setting" className="hidden md:flex flex-col items-center justify-start gap-1">
          <MdOutlineAccountCircle className="text-3xl text-gray-400" />
          {/* <p className="text-sm text-gray-400">setting</p> */}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
