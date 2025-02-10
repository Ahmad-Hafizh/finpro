import React from 'react';
import { BiHomeSmile } from 'react-icons/bi';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { FiPackage } from 'react-icons/fi';
import { MdOutlineAccountCircle } from 'react-icons/md';
import Link from 'next/link';
import { IoCartOutline } from 'react-icons/io5';

const Botbar = () => {
  const navList = [
    {
      route: '/',
      icon: <BiHomeSmile className="text-2xl " />,
    },
    {
      route: '/cart',
      icon: <IoCartOutline className="text-2xl " />,
    },
    {
      route: '/catalog',
      icon: <MdOutlineShoppingBag className="text-2xl " />,
    },
    {
      route: '/order',
      icon: <FiPackage className="text-2xl " />,
    },
    {
      route: '/setting',
      icon: <MdOutlineAccountCircle className="text-2xl " />,
    },
  ];
  return (
    <div className="fixed md:hidden bottom-0 h-20 flex px-[5%] py-4 justify-between items-center w-full bg-white border-t rounded-t-xl ">
      {navList.map((e, i) => (
        <Link href={e.route} className="flex flex-col items-center justify-end gap-1" key={i}>
          {e.icon}
        </Link>
      ))}
    </div>
  );
};

export default Botbar;
