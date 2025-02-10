import React from 'react';
import { BiHomeSmile } from 'react-icons/bi';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { FiPackage } from 'react-icons/fi';
import { MdOutlineAccountCircle } from 'react-icons/md';
import Link from 'next/link';

const Botbar = () => {
  return (
    <div className="fixed md:hidden bottom-0 h-20 flex px-[5%] py-4 justify-between items-center w-full bg-gray-200 rounded-t-xl ">
      <Link href="/" className="flex flex-col items-center justify-end gap-1">
        <BiHomeSmile className="text-3xl text-gray-400" />
        {/* <p className="text-sm text-gray-400">home</p> */}
      </Link>
      <Link href="/cart" className="flex flex-col items-center justify-start gap-1">
        <FaRegCalendarAlt className="text-3xl text-gray-400" />
        {/* <p className="text-sm text-gray-400">activity</p> */}
      </Link>
      <Link href="/katalog" className="flex flex-col items-center justify-start gap-1">
        <MdOutlineShoppingBag className="text-3xl text-gray-400" />
        {/* <p className="text-sm text-gray-400">shop</p> */}
      </Link>
      <Link href="/order" className="flex flex-col items-center justify-start gap-1">
        <FiPackage className="text-3xl text-gray-400" />
        {/* <p className="text-sm text-gray-400">order</p> */}
      </Link>
      <Link href="setting" className="flex flex-col items-center justify-start gap-1">
        <MdOutlineAccountCircle className="text-3xl text-gray-400" />
        {/* <p className="text-sm text-gray-400">setting</p> */}
      </Link>
    </div>
  );
};

export default Botbar;
