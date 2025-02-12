import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
// import { FaFacebookF } from 'react-icons/fa';

const SignInPage = () => {
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
          <div className="w-full">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              name="email"
              type="text"
              placeholder="user@mail.com"
              className="w-full rounded-sm border p-2"
            />
          </div>
          <div className="w-full">
            <div className="flex justify-between text-sm">
              <label htmlFor="password">Password</label>
              <Link href="/forgot-password">Forgot password?</Link>
            </div>
            <input
              name="password"
              type="password"
              placeholder="enter your password"
              className="w-full rounded-sm border p-2"
            />
          </div>
          <Button type="submit" className="text-md w-full rounded-full p-6">
            Sign in
          </Button>
        </div>
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

export default SignInPage;
