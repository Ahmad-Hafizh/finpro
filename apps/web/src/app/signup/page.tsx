"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { callAPI } from "@/config/axios";

const signUpSchema = z.object({
  name: z
    .string()
    .min(4, { message: "must be more than 4 characters" })
    .max(150, { message: "must be less than 150 characters" }),
  email: z.string().email({ message: "email is not defined" }),
});

const SignUpPage = () => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    try {
      const response = await callAPI.post("/account/sign-up", {
        name: values.name,
        email: values.email,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="relative mx-auto flex h-fit w-full max-w-sm flex-col gap-10 rounded-xl px-5 py-10 md:border">
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-3xl font-medium">Sign up</h1>
          <p className="px-5 text-center text-sm leading-tight text-[#737373]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque,
            quisquam.
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center justify-center gap-4"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 space-y-0">
                  <FormLabel className="text-sm">Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="user name"
                      className="w-full rounded-sm border p-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 space-y-0">
                  <FormLabel className="text-sm">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="example user@mail.com"
                      className="w-full rounded-sm border p-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="text-md w-full rounded-full p-6">
              Sign up
            </Button>
          </form>
        </Form>
        <div className="flex items-center gap-2">
          <hr className="w-full" />
          <p className="text-nowrap text-center text-sm">Or continue with</p>
          <hr className="w-full" />
        </div>
        <div className="flex items-center justify-center gap-4">
          <Link href="/apple">
            <Button className="flex h-16 w-16 items-center rounded-full border bg-white">
              <FaGoogle className="text-3xl text-black" />
            </Button>
          </Link>
          <Link href="/google">
            <Button className="flex h-16 w-16 items-center rounded-full border bg-white">
              <FaGoogle className="text-3xl text-black" />
            </Button>
          </Link>
          <Link href="/facebook">
            <Button className="flex h-16 w-16 items-center rounded-full border bg-white">
              <FaGoogle className="text-3xl text-black" />
            </Button>
          </Link>
        </div>
        <div className="">
          <p className="text-center text-sm">
            dont have an account? <Link href="/sign-up">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
