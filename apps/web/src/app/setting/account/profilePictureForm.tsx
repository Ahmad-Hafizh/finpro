"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { callAPI } from "@/config/axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import z from "zod";
import { useSession } from "next-auth/react";

interface IProfilePictureFormProps {
  image: string;
  isOauth: boolean;
}

const profileSchema = z.object({
  profile_image: z
    .instanceof(File)
    .refine((file) => file, { message: "file is required" })
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(
          file.type,
        ),
      {
        message: "File format must be either jpg, jpeg, png or gif.",
      },
    )
    .refine((file) => file.size < 1000000, {
      message: "File can't be bigger than 1MB.",
    }),
});

const ProfilePictureForm: React.FC<IProfilePictureFormProps> = ({
  image,
  isOauth,
}) => {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
  });
  const { data: session, status } = useSession();
  const [imageUrl, setImageUrl] = useState("");

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    console.log(values.profile_image);

    if (!values.profile_image) return null;

    const formData = new FormData();
    formData.append("profile_image", values.profile_image);

    console.log(formData);

    try {
      if (status == "authenticated") {
        const response = await callAPI.patch("/account/update-pfp", formData, {
          headers: { Authorization: `Bearer ${session.user.auth_token}` },
        });
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onCheckSubmit = () => {
    console.log("submited");
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
                      onChange={(e) => {
                        const files = e.target.files;
                        const file = files?.[0];
                        field.onChange(file || null);

                        if (file) {
                          const fileUrl = URL.createObjectURL(file);
                          setImageUrl(fileUrl);
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ProfilePictureForm;
