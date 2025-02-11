'use client';
import React, { useState, useEffect } from 'react';
import { BiHomeSmile } from 'react-icons/bi';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { FiPackage } from 'react-icons/fi';
import { MdOutlineAccountCircle } from 'react-icons/md';
import Link from 'next/link';
import { IoCartOutline } from 'react-icons/io5';
import { usePathname } from 'next/navigation';

const Botbar = () => {
  const navList = [
    {
      route: '/',
      icon: <BiHomeSmile className="text-3xl " />,
    },
    {
      route: '/cart',
      icon: <IoCartOutline className="text-3xl " />,
    },
    {
      route: '/catalog',
      icon: <MdOutlineShoppingBag className="text-3xl " />,
    },
    {
      route: '/order',
      icon: <FiPackage className="text-3xl " />,
    },
    {
      route: '/setting',
      icon: <MdOutlineAccountCircle className="text-3xl " />,
    },
  ];

  const pathName = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (pathName == '/') {
      setIsVisible(true);
    }
  }, [pathName]);

  return (
    <div className={`${isVisible ? 'flex' : 'hidden'} fixed md:hidden bottom-0 h-20 px-[5%] py-4 justify-between items-center w-full bg-white border-t rounded-t-xl `}>
      {navList.map((e, i) => (
        <Link href={e.route} className="flex flex-col items-center justify-end gap-1" key={i}>
          {e.icon}
        </Link>
      ))}
    </div>
  );
};

export default Botbar;
