"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { callAPI } from "@/config/axios";
import { zfd } from "zod-form-data";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

interface IProfilePictureFormProps {
  image: string;
  isOauth: boolean;
}

const profileSchema = zfd
  .file()
  .refine((file) => file.size < 1000000, {
    message: "File can't be bigger than 1MB.",
  })
  .refine(
    (file) =>
      ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(file.type),
    {
      message: "File format must be either jpg, jpeg, png or gif.",
    },
  );

const ProfilePictureForm: React.FC<IProfilePictureFormProps> = ({
  image,
  isOauth,
}) => {
  const form = useForm({
    resolver: zodResolver(profileSchema),
  });

  const imageRef = useRef<HTMLInputElement>(null);
  const onSubmit = async () => {
    try {
      console.log(imageRef.current?.files);
      const response = await callAPI.patch("/account/update-pfp", {
        profile_image: imageRef.current?.files?.[0],
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
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
        <p className="text-sm">
          max sizes 1MB with JPG, JPEG, PNG & GIF format
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="profile_image"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className=""
                      type="file"
                      placeholder="profile picture"
                      disabled={isOauth}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isOauth} onClick={onSubmit}>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ProfilePictureForm;
