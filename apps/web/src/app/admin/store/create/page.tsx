/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import CreateForm from "./CreateForm";
import { auth } from "@/auth";
import { redirect } from "next/dist/server/api-utils";

const CreateStorePage = async () => {
  const session = await auth();
  if (!session?.user.auth_token) return;

  return (
    <div className="flex flex-col gap-5 py-24">
      <p className="text-xl">Create Store</p>
      <CreateForm token={session?.user.auth_token} />
    </div>
  );
};

export default CreateStorePage;
