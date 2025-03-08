/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Button } from "../ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import SearchBar from "./SearchBar";

interface IMobileNavProps {
  store_name: string;
  user_name?: string | null | undefined;
  user_pfp?: string | null | undefined;
  pathName: string;
  stores: any[];
  onSelectStore: (storeName: string) => void;
}

const MobileNav: React.FunctionComponent<IMobileNavProps> = ({
  user_name,
  store_name,
  user_pfp,
  pathName,
  stores,
  onSelectStore,
}) => {
  const router = useRouter();
  const currentLoc = pathName.split("/")[pathName.split("/").length - 1];
  return (
    <div className="h-full w-full md:hidden">
      {pathName == "/" ? (
        <div className="flex h-full w-full items-center justify-between gap-4">
          <div className="flex gap-4">
            {user_name ? (
              <Avatar>
                <AvatarImage src={user_pfp || ""} />
                <AvatarFallback>{user_name?.slice(0, 2)}</AvatarFallback>
              </Avatar>
            ) : (
              <Image
                src="/logofinpro.png"
                alt="greeneries logo"
                sizes="512"
                width={40}
                height={40}
              />
            )}
            <div className="flex flex-col">
              <p className="text-sm text-gray-500">Deliver from :</p>
              <Select
                value={store_name}
                onValueChange={(e) => onSelectStore(e)}
              >
                <SelectTrigger className="text-md h-fit space-y-0 overflow-hidden border-0 p-0 focus:outline-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {stores.map((e: any, i: number) => (
                    <SelectItem value={e.store_name} key={i}>
                      {e.store_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Search />
          </div>
        </div>
      ) : pathName.startsWith("/explore") ? (
        <SearchBar />
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
