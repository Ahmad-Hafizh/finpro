import React from 'react';
import { BiHomeSmile } from 'react-icons/bi';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { FiPackage } from 'react-icons/fi';
import { MdOutlineAccountCircle } from 'react-icons/md';

const Botbar = () => {
  return (
    <div className="fixed md:hidden bottom-0 flex border-t px-[5%] py-4 justify-between w-full border-black ">
      <div className="flex flex-col items-center justify-end gap-1">
        <BiHomeSmile className="text-3xl" />
        <p className="text-sm">home</p>
      </div>
      <div className="flex flex-col items-center justify-start gap-1">
        <FaRegCalendarAlt className="text-3xl" />
        <p className="text-sm">activity</p>
      </div>
      <div className="flex flex-col items-center justify-start gap-1">
        <MdOutlineShoppingBag className="text-3xl" />
        <p className="text-sm">shop</p>
      </div>
      <div className="flex flex-col items-center justify-start gap-1">
        <FiPackage className="text-3xl" />
        <p className="text-sm">order</p>
      </div>
      <div className="flex flex-col items-center justify-start gap-1">
        <MdOutlineAccountCircle className="text-3xl" />
        <p className="text-sm">setting</p>
      </div>
    </div>
  );
};

export default Botbar;
