/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import HeaderDashboard from "./components/header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const { data: session } = useSession();
  const route = useRouter();

  return (
    <>
      <HeaderDashboard pagename="Admin Dashboard" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="informasi flex h-1/5 w-full rounded-lg bg-gradient-to-r from-green-300 to-green-200">
          <div className="profile flex h-full w-full flex-col items-start justify-center px-20">
            <h2 className="text-2xl font-bold">
              Welcome, {session?.user.name}!
            </h2>
            <h2 className="text-lg">
              This is admin dashboard. Navigate to admin menu here.
            </h2>
          </div>
        </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <Card
            className="cursor-pointer bg-slate-100 hover:bg-gradient-to-r hover:from-green-300 hover:to-green-200"
            onClick={() => {
              route.push("/admin/product");
            }}
          >
            <CardHeader>
              <h1 className="text-lg font-bold">Product Management</h1>
            </CardHeader>
            <CardContent>
              <h2 className="text-md">Manage product here</h2>
            </CardContent>
          </Card>
          <Card
            className="cursor-pointer bg-slate-100 hover:bg-gradient-to-r hover:from-green-300 hover:to-green-200"
            onClick={() => {
              route.push("/admin/category");
            }}
          >
            <CardHeader>
              <h1 className="text-lg font-bold">Category Management</h1>
            </CardHeader>
            <CardContent>
              <h2 className="text-md">Manage category here</h2>
            </CardContent>
          </Card>
          <Card
            className="cursor-pointer bg-slate-100 hover:bg-gradient-to-r hover:from-green-300 hover:to-green-200"
            onClick={() => {
              route.push("/admin/voucher");
            }}
          >
            <CardHeader>
              <h1 className="text-lg font-bold">Voucher Management</h1>
            </CardHeader>
            <CardContent>
              <h2 className="text-md">Manage voucher here</h2>
            </CardContent>
          </Card>
          <Card
            className="cursor-pointer bg-slate-100 hover:bg-gradient-to-r hover:from-green-300 hover:to-green-200"
            onClick={() => {
              route.push("/admin/stock");
            }}
          >
            <CardHeader>
              <h1 className="text-lg font-bold">Stock Management</h1>
            </CardHeader>
            <CardContent>
              <h2 className="text-md">Manage stock here</h2>
            </CardContent>
          </Card>
          <Card
            className="cursor-pointer bg-slate-100 hover:bg-gradient-to-r hover:from-green-300 hover:to-green-200"
            onClick={() => {
              route.push("/admin/user");
            }}
          >
            <CardHeader>
              <h1 className="text-lg font-bold">User Management</h1>
            </CardHeader>
            <CardContent>
              <h2 className="text-md">Manage user here</h2>
            </CardContent>
          </Card>
          <Card
            className="cursor-pointer bg-slate-100 hover:bg-gradient-to-r hover:from-green-300 hover:to-green-200"
            onClick={() => {
              route.push("/admin/stockreport");
            }}
          >
            <CardHeader>
              <h1 className="text-lg font-bold">Stock Report</h1>
            </CardHeader>
            <CardContent>
              <h2 className="text-md">See stock report here</h2>
            </CardContent>
          </Card>
          <Card
            className="cursor-pointer bg-slate-100 hover:bg-gradient-to-r hover:from-green-300 hover:to-green-200"
            onClick={() => {
              route.push("/admin/salesreport");
            }}
          >
            <CardHeader>
              <h1 className="text-lg font-bold">Sales Report</h1>
            </CardHeader>
            <CardContent>
              <h2 className="text-md">See sales report here</h2>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
