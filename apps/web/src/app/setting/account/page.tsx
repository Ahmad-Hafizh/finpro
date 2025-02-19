import { Input } from "@/components/ui/input";
import { auth } from "@/config/auth";
import Image from "next/image";
import React from "react";

const AccountPage = async () => {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="col-span-1 flex flex-col gap-4 rounded-xl border-2 p-4">
        <div className="relative aspect-square w-full overflow-hidden rounded-full bg-gray-300">
          <Image
            src={session?.user?.image || ""}
            alt="profile picture"
            fill
            className="absolute"
          />
        </div>
        <Input className="" type="file" placeholder="profile picture" />
      </div>
      <div className="col-span-2 flex flex-col gap-4 rounded-xl border p-4">
        <div className="">
          <label htmlFor="">name</label>
          <Input
            className=""
            placeholder="name"
            value={session.user.name || undefined}
          />
        </div>
        <div className="">
          <label htmlFor="">email</label>
          <Input
            className=""
            placeholder="email"
            value={session.user.email || undefined}
            disabled
          />
        </div>
        <div className="">
          <label htmlFor="">phone</label>
          <Input className="" placeholder="phone" />
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
