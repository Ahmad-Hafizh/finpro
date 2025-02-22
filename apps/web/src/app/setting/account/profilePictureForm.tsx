import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ISession {
  user: {
    name: string;
    email: string;
    image?: string;
    isOauth: boolean;
    role: string;
  };
}

const ProfilePictureForm: React.FC<{ session: ISession }> = ({ session }) => {
  return (
    <>
      <div className="relative aspect-square w-40 overflow-hidden rounded-full bg-gray-300">
        <Image
          src={session?.user.image || ""}
          alt="profile picture"
          fill
          className="absolute"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-3xl">Profile Picture</p>
        <p className="text-sm">max sizes 5 MB with JPG, JPEG, PNG format</p>
        <Input
          className=""
          type="file"
          placeholder="profile picture"
          disabled={session?.user.isOauth}
        />
        <Button type="button" disabled={session?.user.isOauth}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default ProfilePictureForm;
