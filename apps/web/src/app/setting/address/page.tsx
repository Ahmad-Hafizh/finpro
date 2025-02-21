import { Button } from "@/components/ui/button";
import React from "react";

const AddressPage = () => {
  return (
    <div className="w-full max-w-3xl rounded-xl border p-10">
      <div className="flex flex-col gap-10">
        <div className="flex justify-between">
          <p className="text-3xl">Address</p>
          <Button>Add address</Button>
        </div>
        <div className="flex flex-col">
          <div className="flex h-full w-full justify-between rounded-lg border p-4">
            <div className="flex flex-col gap-2">
              <p className="text-xl">Home</p>
              <div className="leading-tight">
                <p>0123456789</p>
                <p>Jl.Pemuda no.15, surabaya</p>
              </div>
            </div>
            <div className="flex h-full flex-col items-end justify-between">
              <Button variant={"link"}>X</Button>
              <div className="flex">
                <Button variant={"link"}>Edit</Button>
                <Button>Select</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
