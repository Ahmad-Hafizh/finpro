import { Button } from '@/components/ui/button';
import React from 'react';
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';
import { FaFacebookF } from 'react-icons/fa';

const SignInPage = () => {
  return (
    <div className="container mx-auto h-screen px-[5%] py-10 flex flex-col justify-between">
      <div className=" flex flex-col gap-4">
        <h1 className="text-5xl font-medium">let's Sign in</h1>
        <p className="text-xl leading-6">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, quisquam.</p>
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <input type="text" placeholder="email" className="border rounded-sm p-4 w-full" />
        <input type="password" placeholder="password" className="border rounded-sm p-4 w-full" />
        <Button type="submit" className="w-full p-6 rounded-full">
          Sign in
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-center text-xl">or continue with</p>
        <div className="flex w-full justify-center gap-4">
          <Button className="bg-white border rounded-full w-full p-6 flex items-center">
            <FaGoogle className="text-black" />
            <p className="text-black text-xl font-semibold">Google</p>
          </Button>
        </div>
      </div>
      <div className="">
        <p className="text-xl text-center">
          dont have an account? <Link href="/sign-up">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
