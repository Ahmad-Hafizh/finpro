import Link from "next/link";
import React from "react";

const SidePanel = () => {
  const settingList = [
    {
      name: "Account",
      route: "/setting/account",
    },
    {
      name: "Address",
      route: "/setting/address",
    },
    {
      name: "Referral",
      route: "/setting/referral",
    },
  ];

  return (
    <div className="hidden h-full w-40 flex-col gap-4 rounded-xl border p-10 md:flex">
      <h1 className="text-xl font-medium">Setting</h1>
      {settingList.map((e, i) => (
        <Link key={i} href={e.route}>
          {e.name}
        </Link>
      ))}
    </div>
  );
};

export default SidePanel;
