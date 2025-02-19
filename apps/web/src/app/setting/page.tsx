import Link from "next/link";
import React from "react";
import { UserRoundPen, MapPinned, UsersRound } from "lucide-react";
import { auth } from "@/config/auth";
import Image from "next/image";

const SettingPage = async () => {
  const settingList = [
    {
      name: "Account",
      route: "/setting/account",
      icon: <UserRoundPen />,
    },
    {
      name: "Address",
      route: "/setting/address",
      icon: <MapPinned />,
    },
    {
      name: "Referral",
      route: "/setting/referral",
      icon: <UsersRound />,
    },
  ];

  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center gap-2">
        <div className="relative h-20 w-20 rounded-full bg-gray-300">
          {session.user.image ?? (
            <Image
              sizes="100"
              className="absolute"
              fill
              alt="profile picture"
              src={session.user.image || ""}
            />
          )}
        </div>
        <div className="">
          <p className="text-2xl">{session.user.name}</p>
          <p className="text-sm text-gray-500">{session.user.email}</p>
        </div>
      </div>
      <div className="flex flex-col">
        {settingList.map((e, i) => (
          <Link
            key={i}
            href={e.route}
            className="flex items-center gap-2 border-t p-4"
          >
            {e.icon}
            <p>{e.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SettingPage;
