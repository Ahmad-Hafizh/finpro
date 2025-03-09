"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
// import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../../../../../schemas/authSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { onSignIn } from "@/actions/signInAction";
import GoogleSignInButton from "@/components/global/GoogleSignInButton";

const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    setLoading(true);
    await onSignIn(values).then((res) => {
      if (res.error) {
        setError(res.error);
      } else {
        setError("");
      }
    });
    setLoading(false);
  };
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="relative mx-auto flex h-fit w-full max-w-sm flex-col gap-10 rounded-xl px-5 py-10 md:border">
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-3xl font-medium">Sign in</h1>
          <p className="px-5 text-center text-sm leading-tight text-[#737373]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque,
            quisquam.
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col items-center justify-center gap-4"
            >
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-1 space-y-0">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-1 space-y-0">
                    <FormLabel>
                      <div className="flex justify-between text-sm">
                        <label htmlFor="password">Password</label>
                        <Link href="/forgot-password">Forgot password?</Link>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-red py-2">{error}</p>
              <Button
                type="submit"
                disabled={loading}
                className={`text-md w-full rounded-full p-6 disabled:bg-gray-200`}
              >
                Sign in
              </Button>
            </form>
          </Form>
        </div>
        <div className="flex items-center gap-2">
          <hr className="w-full" />
          <p className="text-nowrap text-center text-sm">Or continue with</p>
          <hr className="w-full" />
        </div>
        <div className="flex items-center justify-center gap-4">
          <GoogleSignInButton />
        </div>
        <div className="">
          <p className="text-center text-sm">
            dont have an account? <Link href="/auth/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
