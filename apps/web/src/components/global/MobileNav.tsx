"use client";
import React from "react";
import { Button } from "../ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface IMobileNavProps {
  store_name: string;
  user_name?: string | null | undefined;
  user_pfp?: string | null | undefined;
  pathName: string;
}

const MobileNav: React.FunctionComponent<IMobileNavProps> = ({
  user_name,
  store_name,
  user_pfp,
  pathName,
}) => {
  const router = useRouter();
  const currentLoc = pathName.split("/")[pathName.split("/").length - 1];
  return (
    <div className="h-full w-full md:hidden">
      {pathName == "/" || pathName.startsWith("/explore") ? (
        <div className="flex h-full w-full items-center justify-between gap-4">
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src={user_pfp || ""} />
              <AvatarFallback>{user_name?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm text-gray-500">Deliver from :</p>
              <p className="text-l leading-tight">{store_name}</p>
            </div>
          </div>
          <div>
            <Search />
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center gap-2">
          <Button
            className="space-y-0 hover:bg-transparent"
            variant={"ghost"}
            onClick={() => router.back()}
          >
            <FaArrowLeft className="text-3xl" />
          </Button>
          <p className="text-xl capitalize">
            {parseInt(currentLoc)
              ? pathName.split("/")[pathName.split("/").length - 2]
              : currentLoc}
          </p>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
