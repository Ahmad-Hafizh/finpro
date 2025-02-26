import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const NewAddressPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-xl">New Address</p>
      <div className="flex flex-col gap-2">
        <Input className="border" placeholder="Address name" />
        <Input className="border" placeholder="Street" />
        <Input className="border" placeholder="City" />
        <Input className="border" placeholder="Country" />
        <Input className="border" placeholder="Post Code" />
      </div>
      <Button>Add Address</Button>
    </div>
  );
};

export default NewAddressPage;
