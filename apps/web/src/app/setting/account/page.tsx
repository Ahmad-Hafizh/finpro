import React from "react";
import { auth } from "@/auth";
import AccountForm from "./accountForm";
import ProfilePictureForm from "./profilePictureForm";

const AccountPage = async () => {
  const session = await auth();

  if (!session?.user) {
    return null;
  }
  const { user } = session;
  console.log(user);

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <div className="col-span-1 flex flex-col items-center gap-4 rounded-xl border-2 p-10 md:flex-row md:gap-10 lg:flex-col lg:gap-4">
        <ProfilePictureForm image={user.image || ""} isOauth={user.isOauth} />
      </div>
      <div className="col-span-1 flex flex-col gap-4 rounded-xl border p-10 lg:col-span-2">
        <p className="text-3xl">Account</p>
        <AccountForm
          name={user.name}
          email={user.email}
          isOauth={user.isOauth}
        />
      </div>
    </div>
  );
};

export default AccountPage;
