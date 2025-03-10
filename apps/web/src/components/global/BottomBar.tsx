"use client";
import React from "react";
import { BiHomeSmile } from "react-icons/bi";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FiPackage } from "react-icons/fi";
import { MdOutlineAccountCircle } from "react-icons/md";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";

const Botbar = () => {
  const navList = [
    {
      route: "/",
      icon: <BiHomeSmile className="text-3xl" />,
    },
    {
      route: "/cart",
      icon: <IoCartOutline className="text-3xl" />,
    },
    {
      route: "/catalog",
      icon: <MdOutlineShoppingBag className="text-3xl" />,
    },
    {
      route: "/order",
      icon: <FiPackage className="text-3xl" />,
    },
    {
      route: "/setting",
      icon: <MdOutlineAccountCircle className="text-3xl" />,
    },
  ];

  const pathName = usePathname();
  const { data: session, status } = useSession();

  if (status != "authenticated") {
    return;
  }

  return (
    <div
      className={`${pathName == "/" || pathName.startsWith("/explore") ? "flex" : "hidden"} fixed bottom-0 h-20 w-full items-center justify-between rounded-t-xl border-t bg-white px-[5%] py-4 md:hidden`}
    >
      {session && status ? (
        navList.map((e, i) => (
          <Link
            href={e.route}
            className="flex flex-col items-center justify-end gap-1"
            key={i}
          >
            {e.icon}
          </Link>
        ))
      ) : (
        <div className="flex">
          <Button>Sing Up</Button>
          <Button>Sing In</Button>
        </div>
      )}
    </div>
  );
};

export default Botbar;
