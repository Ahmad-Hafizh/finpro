"use client";
import { Input } from "@/components/ui/input";
import HeaderDashboard from "../components/header";

import { Checkbox } from "@/components/ui/checkbox";
import PaginationTable from "../components/Pagination";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import AddProduct from "./components/AddProduct";
import { DataTable } from "./components/data-table";
import { ProductList, columns } from "./components/column";
import AddEditCategory from "./components/AddEditCategory";
import EditProduct from "./components/EditProduct";

const productPage = () => {
  const [action, setAction] = useState<string | null>("");
  const [productId, setProductId] = useState<number>(0);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const city = ["Malang", "Surabaya", "Jakarta", "Bandung", "Semarang"];
  const productList = [
    {
      id: 0,
      images: ["https://url"],
      name: "Tomato",
      price: "2000",
      category: "Fruit",
    },
    {
      id: 1,
      images: ["https://url"],
      name: "Carrot",
      price: "3000",
      category: "Dry vegetable",
    },
    {
      id: 2,
      images: ["https://url"],
      name: "Spinach",
      price: "2500",
      category: "Green vegetable",
    },
    {
      id: 3,
      images: ["https://url"],
      name: "Almond",
      price: "10000",
      category: "Nut",
    },
    {
      id: 4,
      images: ["https://url"],
      name: "Mango",
      price: "8000",
      category: "Fruit",
    },
    {
      id: 5,
      images: ["https://url"],
      name: "Onion",
      price: "4000",
      category: "Wet vegetable",
    },
    {
      id: 6,
      images: ["https://url"],
      name: "Lettuce",
      price: "3500",
      category: "Green vegetable",
    },
    {
      id: 7,
      images: ["https://url"],
      name: "Cashew",
      price: "12000",
      category: "Nut",
    },
    {
      id: 8,
      images: ["https://url"],
      name: "Potato",
      price: "5000",
      category: "Dry vegetable",
    },
    {
      id: 9,
      images: ["https://url"],
      name: "Cucumber",
      price: "3000",
      category: "Wet vegetable",
    },
  ];

  console.log(productList);

  const category = [
    "Dry vegetable",
    "Fruit",
    "Wet vegetable",
    "Green vegetable",
    "Nut",
  ];

  return (
    <>
      <HeaderDashboard pagename="Product Management" />
      <div className="flex flex-col p-5 h-full w-full gap-5">
        <div className="informasi rounded-lg bg-gradient-to-r from-green-300 to-green-200 h-1/5  w-full flex">
          <div className="profile flex flex-col justify-center items-start px-20 h-full w-full">
            <h2 className="text-2xl font-bold">Welcome, Name!</h2>
            <h2 className="text-lg">Manage or see product information here.</h2>
          </div>
          <div className="flex flex-col justify-center items-end gap-5 px-20 h-full w-full">
            <Button
              onClick={() => {
                setOpenDialog(true);
                setAction("Add");
              }}
            >
              Add new product
            </Button>
            <Button
              onClick={() => {
                setOpenDialog(true);
                setAction("Category");
              }}
            >
              Category Management
            </Button>
          </div>
        </div>
        <div className="main flex gap-5 h-full w-full">
          <div className="filter-box rounded-lg shadow-sm border border-gray-200 h-full w-1/4 p-6 gap-3">
            <h2 className="font-bold text-lg">Filter</h2>
            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>Category</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1 ">
                    {category.map((category) => {
                      return (
                        <div
                          key={category}
                          className="flex justify-between items-center py-2"
                        >
                          <label
                            htmlFor={category}
                            className="text-sm font-medium leading-none h-full w-full"
                          >
                            {category}
                          </label>
                          <Checkbox id={category} />
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
                  columns={columns(setAction, setProductId, setOpenDialog)}
                  data={productList}
                />
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogContent>
                    {action === "Delete" && (
                      <>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <p>This action cannot be undone.</p>
                        <Button
                          onClick={() => console.log(`Deleted ${productId}`)}
                        >
                          Confirm Delete
                        </Button>
                      </>
                    )}
                    {action === "Add" && (
                      <>
                        <DialogTitle>Add Product</DialogTitle>
                        <AddProduct />
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
                        <EditProduct productData={productList[productId]} />
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

export default productPage;
