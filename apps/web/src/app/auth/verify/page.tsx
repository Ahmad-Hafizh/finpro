"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { callAPI } from "@/config/axios";
import { useRouter, useSearchParams } from "next/navigation";
import { passwordSchema } from "../../../../../schemas/authSchema";
import { toast } from "@/hooks/use-toast";

const VerifyPage = () => {
  const params = useSearchParams();
  const token = params.get("a_t");
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const router = useRouter();

  const onVerify = async (values: z.infer<typeof passwordSchema>) => {
    if (values.password !== values.confirmPassword) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "Password does not match",
      });
    } else {
      try {
        const response = await callAPI.post(
          "/account/verify",
          {
            password: values.password,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        );

        toast({
          title: "Verify Account",
          description: response.data.message,
        });

        router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="relative mx-auto flex h-fit w-full max-w-sm flex-col gap-10 rounded-xl px-5 py-10 md:border">
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-3xl font-medium">
            Verify email & set password
          </h1>
          <p className="px-5 text-center text-sm leading-tight text-[#737373]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque,
            quisquam.
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onVerify)}
            className="flex flex-col gap-6"
          >
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="enter your password"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confrim Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="confirm your password"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="text-md w-full rounded-full p-6">
              set password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerifyPage;
