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
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const userPage = () => {
  const [action, setAction] = useState<string | null>(null);
  const [adminId, setAdminId] = useState<number>(1);
  const [data, setData] = useState<any>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [store, setStore] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user.role === "super_admin") {
      setIsSuperAdmin(true);
    }
  }, [session]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const pageParam = params.get("page") || "1";

    if (pageParam !== currentPage.toString()) {
      setCurrentPage(parseInt(pageParam));
    }

    if (!params.has("page")) {
      params.set("page", "1");
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [searchParams, router]);

  const getData = async () => {
    try {
      const response = await callAPI.get("/admin");
      const data = response.data.result.admins;
      console.log("INI DATA ADMIN : ", data);
      setData(data);
      setTotalPage(response.data.result.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getAllStore();
    relevantData();
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
            <h2 className="text-2xl font-bold">
              Welcome, {session?.user.name}!
            </h2>
            <h2 className="text-lg">Manage or see user information here.</h2>
          </div>
          <div className="flex h-full w-full items-center justify-end px-20">
            {isSuperAdmin ? <Button>Add new admin</Button> : <></>}
          </div>
        </div>
        <div className="main flex h-full w-full gap-5">
          <FilterBox allStore={store} />
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
                        {status == "authenticated" ? (
                          <EditAdminForm
                            superAdminAccessToken={
                              session?.user.auth_token as string
                            }
                            adminData={adminId}
                            setOpenDialog={setOpenDialog}
                            storeData={store}
                          />
                        ) : (
                          <p>loading</p>
                        )}
                        {status == "authenticated" ? (
                          <EditAdminForm
                            superAdminAccessToken={
                              session?.user.auth_token as string
                            }
                            adminData={adminId}
                            setOpenDialog={setOpenDialog}
                            storeData={store}
                          />
                        ) : (
                          <p>loading</p>
                        )}
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
              <div className="pagination flex items-center justify-center">
                <PaginationTable
                  currentPage={currentPage}
                  totalPage={totalPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default userPage;
