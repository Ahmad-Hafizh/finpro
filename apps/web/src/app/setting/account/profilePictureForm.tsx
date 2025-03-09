"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { callAPI } from "@/config/axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface IProfilePictureFormProps {
  image: string;
  isOauth: boolean;
  name: string;
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
  name,
}) => {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
  });

  const { data: session, status } = useSession();

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    if (!values.profile_image) return null;

    const formData = new FormData();
    formData.append("profile_image", values.profile_image);

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
  return (
    <div className="col-span-1 flex flex-col items-center justify-center gap-4 md:flex-row md:justify-start md:gap-10 md:rounded-xl md:border-2 md:p-10 lg:flex-col lg:justify-center lg:gap-4">
      <Avatar className="h-20 w-20">
        <AvatarImage src={image || ""} />
        <AvatarFallback>{name?.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-center gap-2 md:items-start lg:items-center">
        <p className="text-center text-2xl">Profile Picture</p>
        <p className="text-center text-sm">
          max sizes 1MB with JPG, JPEG, PNG & GIF format
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 md:flex-row lg:flex-col"
          >
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
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProfilePictureForm;
