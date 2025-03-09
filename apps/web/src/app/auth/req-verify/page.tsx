"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { callAPI } from "@/config/axios";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
});
const ReqVerify: React.FC = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);

      await callAPI.post("/account/ask-verify", {
        email: values.email,
      });

      toast({
        title: "Request Verify",
        description: "an verification email sent to you",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto flex h-screen max-w-md flex-col items-center justify-center gap-4">
      <p className="text-xl">Verify your Account</p>
      <p className="w-3/4 text-center text-sm text-gray-600">
        Your email is not verified and you need to set password to login with
        your email. we will send you verification email to your email. type your
        email below
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center gap-2"
        >
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="enter your email"
                    className="border-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Request Verification
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ReqVerify;
