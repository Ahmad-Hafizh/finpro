"use client"
import HeaderDashboard from "../components/header";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "./components/data-table";
import { CategoryList, columns } from "./components/column";
import AddEditCategory from "./components/AddCategory";
import { Input } from "@/components/ui/input";
import AddCategory from "./components/AddCategory";
import PaginationTable from "../components/Pagination";
import EditCategory from "./components/EditCategory";


const categoryPage = () => {
      const [action, setAction] = useState<string | null>("");
      const [categoryId, setCategoryId] = useState<number>(0);
      const [openDialog, setOpenDialog] = useState<boolean>(false);

      const category = [
        { id: 1, name: "Dry Fruit" },
        { id: 2, name: "Fresh Fruit" },
        { id: 3, name: "Vegetables" },
        { id: 4, name: "Dairy Products" },
        { id: 5, name: "Bakery" },
        { id: 6, name: "Beverages" },
        { id: 7, name: "Meat & Poultry" },
        { id: 8, name: "Seafood" },
        { id: 9, name: "Snacks" },
        { id: 10, name: "Condiments" }
      ];

  return (
    <>
      <HeaderDashboard pagename="Product Management" />
      <div className="flex flex-col p-5 h-full w-full gap-5">
        <div className="informasi rounded-lg bg-gradient-to-r from-green-300 to-green-200 h-1/5  w-full flex">
          <div className="profile flex flex-col justify-center items-start px-20 h-full w-full">
            <h2 className="text-2xl font-bold">Welcome, Name!</h2>
            <h2 className="text-lg">Manage or see category here.</h2>
          </div>
          <div className="flex flex-col justify-center items-end gap-5 px-20 h-full w-full">
            <Button
              onClick={() => {
                setOpenDialog(true);
                setAction("Add");
              }}
            >
              Add new category
            </Button>
          </div>
        </div>
        <div className="main flex gap-5 h-full w-full">
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
                  columns={columns(setAction, setCategoryId, setOpenDialog)}
                  data={category}
                />
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogContent>
                    {action === "Delete" && (
                      <>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <p>This action cannot be undone.</p>
                        <Button
                          onClick={() => console.log(`Deleted ${categoryId}`)}
                        >
                          Confirm Delete
                        </Button>
                      </>
                    )}
                    {action === "Add" && (
                      <>
                        <DialogTitle>Add Product</DialogTitle>
                        <AddCategory />
                      </>
                    )}
                    {action === "Category" && (
                      <>
                        <DialogTitle>Add, edit, delete category</DialogTitle>
                        <AddEditCategory />
                      </>
                    )}
                    {action === "Edit" && (
                      <>
                        <DialogTitle>Edit Product</DialogTitle>
                        <EditCategory categoryData={category[categoryId]} />
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

export default categoryPage;
