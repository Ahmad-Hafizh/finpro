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
  const [store, setStore] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>([]);

  const getData = async () => {
    try {
      const response = await callAPI.get("/admin");
      const data = response.data.result;
      console.log("INI DATA ADMIN : ", data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getAllStore();
    relevantData();
  }, [adminId]);

  const relevantData = async () => {
    const filtered = data.filter((admin: any) => admin.admin_id === adminId);
    setFilteredData(filtered);
  };

  const getAllStore = async () => {
    try {
      const response = await callAPI.get("/stock/store");
      const data = response.data.result;
      console.log("Ini response get all store : ", data);
      setStore(data);
      // setStoreId(8);
    } catch (error) {
      console.log(error);
    }
  };

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
                  data={data}
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
                          adminData={filteredData}
                          setOpenDialog={setOpenDialog}
                          storeData={store}
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
