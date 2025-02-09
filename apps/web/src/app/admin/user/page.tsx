"use client";
import { Input } from "@/components/ui/input";
import HeaderDashboard from "../components/header";
import { StoreAdmin, columns } from "./column";
import { DataTable } from "./data-table";
import { Checkbox } from "@/components/ui/checkbox";
import PaginationTable from "./components/Pagination";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import EditAdminForm from "./components/EditAdminForm";

const userPage = () => {
  const [action, setAction] = useState<string | null>(null);
  const [adminId, setAdminId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  console.log("Action :", action);

  const dummyData: StoreAdmin[] = [
    { id: 1, name: "Sam Hilgers", store: "Malang", phone: "081888292011" },
    { id: 2, name: "Dian Kartika", store: "Surabaya", phone: "081234567890" },
    { id: 3, name: "Budi Santoso", store: "Jakarta", phone: "082112345678" },
    { id: 4, name: "Rina Maharani", store: "Bandung", phone: "083345678912" },
    { id: 5, name: "Andi Wijaya", store: "Yogyakarta", phone: "081998877665" },
    { id: 6, name: "Siti Rahma", store: "Semarang", phone: "082334455667" },
    { id: 7, name: "Hendra Saputra", store: "Bali", phone: "081776655443" },
    { id: 8, name: "Teguh Prasetyo", store: "Medan", phone: "082998877665" },
    // { id: 9, name: "Lisa Marlina", store: "Makassar", phone: "083345556677" },
  ];

  const city = ["Malang", "Surabaya", "Jakarta", "Bandung", "Semarang"];

  return (
    <>
      <HeaderDashboard pagename="User Management" />
      <div className="flex flex-col p-5 h-full w-full gap-5">
        <div className="informasi rounded-lg bg-slate-100 h-1/5  w-full flex">
          <div className="profile flex flex-col justify-center items-start px-20 h-full w-full">
            <h2 className="text-2xl font-bold">Welcome, Name!</h2>
            <h2 className="text-lg">Manage or see user information here.</h2>
          </div>
          <div className="flex justify-end items-center px-20 h-full w-full">
            <Button>Add new admin</Button>
          </div>
        </div>
        <div className="main flex gap-5 h-full w-full">
          <div className="filter-box rounded-lg shadow-sm border border-gray-200 h-full w-1/4 p-6 gap-3">
            <h2 className="font-bold text-lg">Filter</h2>
            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>City</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1 ">
                    {city.map((city) => {
                      return (
                        <div
                          key={city}
                          className="flex justify-between items-center py-2"
                        >
                          <label
                            htmlFor={city}
                            className="text-sm font-medium leading-none h-full w-full"
                          >
                            {city}
                          </label>
                          <Checkbox id={city} />
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="mainpart flex flex-col w-full h-full gap-5">
            <div className="searchbox rounded-lg h-14 w-full">
              <Input
                type="text"
                placeholder="Search here..."
                className="h-full px-7"
              />
            </div>
            <div className="flex flex-col gap-8">
              <div className="table rounded-lg shadow-sm h-fit w-full">
                <DataTable
                  columns={columns(setAction, setAdminId, setOpenDialog)}
                  data={dummyData}
                />
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogContent>
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
                        <DialogTitle>Edit Admin</DialogTitle>
                        <EditAdminForm storeData={[]} />
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
              <div className="pagination flex justify-center items-center">
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
