import React from "react";
import { Button } from "@/components/ui/button";

const ResetPasswordPage = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="relative mx-auto flex h-fit w-full max-w-sm flex-col gap-6 rounded-xl px-5 py-10 md:border">
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-3xl font-medium">Set New Password</h1>
          <p className="px-5 text-center text-sm leading-tight text-[#737373]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque,
            quisquam.
          </p>
        </div>
        <div className="w-full">
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="enter your password"
            className="w-full rounded-sm border p-2"
          />
        </div>
        <div className="w-full">
          <label htmlFor="password" className="text-sm">
            Confirm Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="enter your password"
            className="w-full rounded-sm border p-2"
          />
        </div>
        <Button type="submit" className="text-md w-full rounded-full p-6">
          set password
        </Button>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
