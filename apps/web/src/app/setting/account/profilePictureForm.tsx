import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface IProfilePictureFormProps {
  image: string;
  isOauth: boolean;
}

const ProfilePictureForm: React.FC<IProfilePictureFormProps> = ({
  image,
  isOauth,
}) => {
  return (
    <>
      <div className="relative aspect-square w-40 overflow-hidden rounded-full bg-gray-300">
        <Image
          src={image || ""}
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
          disabled={isOauth}
        />
        <Button type="button" disabled={isOauth}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default ProfilePictureForm;
