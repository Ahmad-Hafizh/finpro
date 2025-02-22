"use client";
import { Input } from "@/components/ui/input";
import HeaderDashboard from "../components/header";
import { StoreAdmin, columns } from "./column";
import { DataTable } from "./data-table";

import PaginationTable from "../components/Pagination";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import EditAdminForm from "./components/EditAdminForm";
import FilterBox from "./components/FilterBox";
import SearchBox from "./components/SearchBox";
import { callAPI } from "@/config/axios";

const userPage = () => {
  const [action, setAction] = useState<string | null>(null);
  const [adminId, setAdminId] = useState<number>(1);
  const [data, setData] = useState<any>([]);
  const [openDialog, setOpenDialog] = useState(false);

  const getData = async () => {
    try {
      const response = await callAPI.get("/admin");
      const data = response.data.data;
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [adminId]);

  const adminDataDummy: StoreAdmin[] = [
    {
      admin_id: 1,
      account_id: 1,
      store_id: 1,
      phone: "033449910",
      position: "Warehouse",
      account: {
        account_id: 1,
        name: "useradmin1",
        email: "useradmin1@mail.com",
        password: "Abc1234.",
        role: "user",
        isVerified: true,
      },
    },
    {
      admin_id: 2,
      account_id: 2,
      store_id: 2,
      phone: "033449911",
      position: "Manager",
      account: {
        account_id: 2,
        name: "useradmin2",
        email: "useradmin2@mail.com",
        password: "Def5678.",
        role: "admin",
        isVerified: false,
      },
    },
    {
      admin_id: 3,
      account_id: 3,
      store_id: 3,
      phone: "033449912",
      position: "Supervisor",
      account: {
        account_id: 3,
        name: "useradmin3",
        email: "useradmin3@mail.com",
        password: "Ghi9012.",
        role: "user",
        isVerified: true,
      },
    },
    {
      admin_id: 4,
      account_id: 4,
      store_id: 4,
      phone: "033449913",
      position: "HR",
      account: {
        account_id: 4,
        name: "useradmin4",
        email: "useradmin4@mail.com",
        password: "Jkl3456.",
        role: "admin",
        isVerified: false,
      },
    },
    {
      admin_id: 5,
      account_id: 5,
      store_id: 5,
      phone: "033449914",
      position: "Finance",
      account: {
        account_id: 5,
        name: "useradmin5",
        email: "useradmin5@mail.com",
        password: "Mno7890.",
        role: "user",
        isVerified: true,
      },
    },
    {
      admin_id: 6,
      account_id: 6,
      store_id: 6,
      phone: "033449915",
      position: "Security",
      account: {
        account_id: 6,
        name: "useradmin6",
        email: "useradmin6@mail.com",
        password: "Pqr1234.",
        role: "admin",
        isVerified: false,
      },
    },
    {
      admin_id: 7,
      account_id: 7,
      store_id: 7,
      phone: "033449916",
      position: "Operations",
      account: {
        account_id: 7,
        name: "useradmin7",
        email: "useradmin7@mail.com",
        password: "Stu5678.",
        role: "user",
        isVerified: true,
      },
    },
    {
      admin_id: 8,
      account_id: 8,
      store_id: 8,
      phone: "033449917",
      position: "Logistics",
      account: {
        account_id: 8,
        name: "useradmin8",
        email: "useradmin8@mail.com",
        password: "Vwx9012.",
        role: "admin",
        isVerified: false,
      },
    },
    {
      admin_id: 9,
      account_id: 9,
      store_id: 9,
      phone: "033449918",
      position: "IT Support",
      account: {
        account_id: 9,
        name: "useradmin9",
        email: "useradmin9@mail.com",
        password: "Yza3456.",
        role: "user",
        isVerified: true,
      },
    },
    {
      admin_id: 10,
      account_id: 10,
      store_id: 10,
      phone: "033449919",
      position: "Marketing",
      account: {
        account_id: 10,
        name: "useradmin10",
        email: "useradmin10@mail.com",
        password: "Bcd7890.",
        role: "admin",
        isVerified: false,
      },
    },
  ];

  return (
    <>
      <HeaderDashboard pagename="User Management" />
      <div className="flex h-full w-full flex-col gap-5 p-5">
        <div className="informasi flex h-1/5 w-full rounded-lg bg-gradient-to-r from-green-300 to-green-200">
          <div className="profile flex h-full w-full flex-col items-start justify-center px-20">
            <h2 className="text-2xl font-bold">Welcome, Name!</h2>
            <h2 className="text-lg">Manage or see user information here.</h2>
          </div>
          <div className="flex h-full w-full items-center justify-end px-20">
            <Button>Add new admin</Button>
          </div>
        </div>
        <div className="main flex h-full w-full gap-5">
          <FilterBox />
          <div className="mainpart flex h-full w-full flex-col gap-5">
            <div className="searchbox h-14 w-full rounded-lg">
              <SearchBox />
            </div>
            <div className="flex flex-col gap-8">
              <div className="table h-fit w-full rounded-lg shadow-sm">
                <DataTable
                  columns={columns(setAction, setAdminId, setOpenDialog)}
                  data={data ? data : adminDataDummy}
                />
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogContent className="p-12">
                    {action === "Delete" ? (
                      <>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <p>This action cannot be undone.</p>
                        <Button
                          onClick={() => console.log(`Deleted ${adminId}`)}
                        >
                          Confirm Delete
                        </Button>
                      </>
                    ) : (
                      <>
                        <DialogTitle>Edit Admin Role</DialogTitle>
                        <EditAdminForm
                          adminData={data[adminId - 1]}
                          setOpenDialog={setOpenDialog}
                        />
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
              <div className="pagination flex items-center justify-center">
                <PaginationTable currentPage={1} totalPage={3} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default userPage;
