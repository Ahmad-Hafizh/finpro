"use client";
import Link from "next/link";
import React from "react";
import { UserRoundPen, MapPinned, UsersRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { signOutAction } from "@/actions/signOutAction";
import { switchAccountAction } from "@/actions/switchAccount";
import { ExitToApp, SwitchAccount } from "@mui/icons-material";

const SettingPage = () => {
  const settingList = [
    {
      name: "Account",
      route: "/setting/account",
      icon: <UserRoundPen className="h-4 w-4" />,
    },
    {
      name: "Address",
      route: "/setting/address",
      icon: <MapPinned className="h-4 w-4" />,
    },
    {
      name: "Referral",
      route: "/setting/referral",
      icon: <UsersRound className="h-4 w-4" />,
    },
  ];

  const { data: session, status } = useSession();
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-10">
      <div className="flex flex-col items-center justify-center gap-2">
        {status == "authenticated" && session.user ? (
          <>
            <Avatar className="h-20 w-20">
              <AvatarImage src={session.user.image || ""} />
              <AvatarFallback>
                {session.user.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center justify-center">
              <p className="text-xl">{session.user.name}</p>
              <p className="text-sm text-gray-500">{session.user.email}</p>
            </div>
          </>
        ) : (
          <p>loading</p>
        )}
      </div>
      <div className="flex flex-col">
        {settingList.map((e, i) => (
          <Link
            key={i}
            href={e.route}
            className="flex items-center gap-4 border-t p-4"
          >
            {e.icon}
            <p className="text-md">{e.name}</p>
          </Link>
        ))}
        <div className="flex flex-col gap-2">
          <Button type="button" variant="outline" onClick={signOutAction}>
            Switch Account
            <SwitchAccount />
          </Button>
          <Button type="button" variant="outline" onClick={switchAccountAction}>
            Sign Out
            <ExitToApp />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
