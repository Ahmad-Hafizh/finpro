import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

const VerifyPage = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="relative mx-auto flex h-fit w-full max-w-sm flex-col gap-10 rounded-xl px-5 py-10 md:border">
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-3xl font-medium">Verify email</h1>
          <p className="px-5 text-center text-sm leading-tight text-[#737373]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque,
            quisquam.
          </p>
        </div>
        <Link href="/reset-password" className="w-full">
          <Button className="w-full">Verify email</Button>
        </Link>
      </div>
    </div>
  );
};

export default VerifyPage;
