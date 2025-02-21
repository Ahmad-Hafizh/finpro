import { Button } from "@/components/ui/button";
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
      <div className="col-span-1 flex flex-col items-center gap-4 rounded-xl border-2 p-10">
        <div className="relative aspect-square w-40 overflow-hidden rounded-full bg-gray-300">
          <Image
            src={session?.user?.image || ""}
            alt="profile picture"
            fill
            className="absolute"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-3xl">Profile Picture</p>
          <p className="text-sm">max sizes 5 MB with JPG, JPEG, PNG format</p>
          <Input className="" type="file" placeholder="profile picture" />
          <Button>Submit</Button>
        </div>
      </div>
      <div className="col-span-2 flex flex-col gap-4 rounded-xl border p-10">
        <p className="text-3xl">Account</p>
        <div className="">
          <label htmlFor="">name</label>
          <Input
            className=""
            placeholder="name"
            defaultValue={session.user.name || undefined}
          />
        </div>
        <div className="">
          <label htmlFor="">email</label>
          <Input
            className=""
            placeholder="email"
            defaultValue={session.user.email || undefined}
            disabled
          />
        </div>
        <div className="">
          <label htmlFor="">phone</label>
          <Input className="" placeholder="phone" />
        </div>
        <div className="flex justify-end gap-4">
          <Button>Cancel</Button>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
