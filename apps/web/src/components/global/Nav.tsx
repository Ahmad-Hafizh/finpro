import React from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { MdOutlineAccountCircle } from 'react-icons/md';
import Link from 'next/link';
import { BiHomeSmile } from 'react-icons/bi';
import { FiPackage } from 'react-icons/fi';
import { Search } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="w-full h-20 border-b px-[5%] fixed top-0 z-50 bg-white">
      <div className="flex justify-between items-center h-full gap-4">
        <div>
          <BiHomeSmile className="hidden md:flex text-3xl" />
          <div className="md:hidden">
            <p className="text-xs">Welcome back,</p>
            <p className="text-xl leading-tight">User Name</p>
          </div>
        </div>
        <div className="md:hidden">
          <Search />
        </div>
        <div className="hidden md:flex gap-4">
          <input type="text" placeholder="search" className=" w-full border px-2 py-1 rounded-full border-gray-500" />
          <p className="hidden md:flex text-nowrap">Plaza Surabaya</p>
        </div>
        <div className="hidden md:flex gap-4">
          <IoCartOutline className="text-3xl" />
          <Link href="/order" className="flex-col items-center justify-start gap-1">
            <FiPackage className="text-3xl " />
          </Link>
          <Link href="setting" className="flex flex-col items-center justify-start gap-1">
            <MdOutlineAccountCircle className="text-3xl " />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
