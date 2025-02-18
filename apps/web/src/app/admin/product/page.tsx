"use client";
import HeaderDashboard from "../components/header";
import PaginationTable from "../components/Pagination";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import AddProduct from "./components/AddProduct";
import { DataTable } from "./components/data-table";
import { columns } from "./components/column";
import AddEditCategory from "./components/AddEditCategory";
import EditProduct from "./components/EditProduct";
import FilterBox from "./components/FilterBox";
import SearchBox from "./components/SearchBox";
import { callAPI } from "@/config/axios";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import SortBox from "./components/SortBox";

const productPage = () => {
  const [action, setAction] = useState<string | null>("");
  const [productId, setProductId] = useState<number>(0);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [categories, setCategories] = useState<any>([]);
  const [productList, setProductList] = useState<any>([]);

  const { toast } = useToast();
  const searchParams = useSearchParams();

  useEffect(() => {
    getCategory();
    getProduct();
  }, [searchParams]);

  const getCategory = async () => {
    try {
      const response = await callAPI.get("/category");
      console.log("Ini response get category :", response.data.data);
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async () => {
    try {
      const queryParams = searchParams.toString();
      const response = await callAPI.get(`/product?${queryParams}`);
      console.log("Ini response get product :", response.data.data);
      const newResponse = response.data.data.map((product: any) => ({
        ...product,
        status: product.deletedAt ? `Deleted` : "Active",
      }));
      setProductList(newResponse);
    } catch (error) {
      console.log("Ini error get product: ", error);
    }
  };

  const deleteProduct = async (id: any) => {
    try {
      const response = await callAPI.patch("/product/delete", {
        product_id: id,
      });
      if (response.data.isSuccess) {
        toast({
          title: "Success",
          description: "Deleting Product Success",
          className: "bg-gradient-to-r from-green-300 to-green-200",
        });
      }
      setOpenDialog(false);
      console.log("Ini response delete :", response);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while deleting product",
        variant: "destructive",
      });
      setOpenDialog(false);
      console.log("Ini error product delete :", error);
    }
  };
  console.log("INI KATEGORI DARI STATE : ", categories);
  const city = ["Malang", "Surabaya", "Jakarta", "Bandung", "Semarang"];
  // const productList = [
  //   {
  //     id: 0,
  //     images: ["https://url"],
  //     name: "Tomato",
  //     price: "2000",
  //     category: "Fruit",
  //   },
  //   {
  //     id: 1,
  //     images: ["https://url"],
  //     name: "Carrot",
  //     price: "3000",
  //     category: "Dry vegetable",
  //   },
  //   {
  //     id: 2,
  //     images: ["https://url"],
  //     name: "Spinach",
  //     price: "2500",
  //     category: "Green vegetable",
  //   },
  //   {
  //     id: 3,
  //     images: ["https://url"],
  //     name: "Almond",
  //     price: "10000",
  //     category: "Nut",
  //   },
  //   {
  //     id: 4,
  //     images: ["https://url"],
  //     name: "Mango",
  //     price: "8000",
  //     category: "Fruit",
  //   },
  //   {
  //     id: 5,
  //     images: ["https://url"],
  //     name: "Onion",
  //     price: "4000",
  //     category: "Wet vegetable",
  //   },
  //   {
  //     id: 6,
  //     images: ["https://url"],
  //     name: "Lettuce",
  //     price: "3500",
  //     category: "Green vegetable",
  //   },
  //   {
  //     id: 7,
  //     images: ["https://url"],
  //     name: "Cashew",
  //     price: "12000",
  //     category: "Nut",
  //   },
  //   {
  //     id: 8,
  //     images: ["https://url"],
  //     name: "Potato",
  //     price: "5000",
  //     category: "Dry vegetable",
  //   },
  //   {
  //     id: 9,
  //     images: ["https://url"],
  //     name: "Cucumber",
  //     price: "3000",
  //     category: "Wet vegetable",
  //   },
  // ];

  console.log(productList);

  const category = [
    { product_category_id: 1, product_category_name: "Dry vegetable" },
    { product_category_id: 2, product_category_name: "Fruit" },
    { product_category_id: 3, product_category_name: "Wet vegetable" },
    { product_category_id: 4, product_category_name: "Green vegetable" },
    { product_category_id: 5, product_category_name: "Nut" },
  ];

  return (
    <>
      <HeaderDashboard pagename="Product Management" />
      <div className="flex h-full w-full flex-col gap-5 p-5">
        <div className="informasi flex h-1/5 w-full rounded-lg bg-gradient-to-r from-green-300 to-green-200">
          <div className="profile flex h-full w-full flex-col items-start justify-center px-20">
            <h2 className="text-2xl font-bold">Welcome, Name!</h2>
            <h2 className="text-lg">Manage or see product information here.</h2>
          </div>
          <div className="flex h-full w-full flex-col items-end justify-center gap-5 px-20">
            <Button
              onClick={() => {
                setOpenDialog(true);
                setAction("Add");
              }}
            >
              Add new product
            </Button>
          </div>
        </div>
        <div className="main flex h-full w-full gap-5">
          {categories.length > 0 ? (
            <FilterBox categories={categories} />
          ) : (
            <FilterBox categories={category} />
          )}
          <div className="mainpart flex h-full w-full flex-col gap-5">
            <div className="flex h-fit w-full gap-2">
              <div className="searchbox h-14 w-full rounded-lg">
                <SearchBox />
              </div>
              <div className="h-full">
                <SortBox />
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div className="table h-fit w-full rounded-lg shadow-sm">
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
                        <Button onClick={() => deleteProduct(productId)}>
                          Confirm Delete
                        </Button>
                      </>
                    )}
                    {action === "Add" && (
                      <>
                        <DialogTitle>Add Product</DialogTitle>
                        <AddProduct
                          setOpenDialog={setOpenDialog}
                          categories={categories}
                        />
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

export default productPage;
