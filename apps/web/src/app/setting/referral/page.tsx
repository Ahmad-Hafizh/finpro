import { Button } from "@/components/ui/button";
import React from "react";

const ReferralPage = () => {
  return (
    <div className="grid max-w-5xl grid-cols-3 gap-4">
      <div className="col-span-2 flex flex-col gap-4 rounded-xl border p-10">
        <p className="text-3xl">Referred User</p>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 rounded-xl border p-4">
            <div className="aspect-square w-10 rounded-full bg-gray-300"></div>
            <p className="text-xl">Username</p>
          </div>
        </div>
      </div>
      <div className="col-span-1 flex flex-col gap-4 rounded-xl border p-10">
        <p className="text-xl">Your Referral Code</p>
        <p className="text-4xl">AHMA1234</p>
        <div className="flex">
          <Button variant={"outline"}>Share</Button>
        </div>
      </div>
    </div>
  );
};

export default ReferralPage;
