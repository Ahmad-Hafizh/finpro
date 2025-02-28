"use client";

import HeaderDashboard from "../components/header";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { callAPI } from "@/config/axios";
import { useToast } from "@/hooks/use-toast";
import { Suspense } from "react";
import FilterBoxStoreSelector from "./components/FilterBoxStoreSelector";
import { DataTable } from "./components/data-table";
import { columns } from "./components/column";
import AddNewStock from "./components/addNewStock";
import EditStock from "./components/EditStock";

const stockPage = () => {
  const [action, setAction] = useState<string | null>("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [category, setCategory] = useState<any>([]);
  const [storeId, setStoreId] = useState<number>(1);
  const [products, setProducts] = useState<any>([]);
  const [productId, setProductId] = useState<number>(0);
  const [allProducts, setAllProducts] = useState<any>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("INI STORE ID", storeId);
  }, [storeId]);

  useEffect(() => {
    getProduct(storeId.toString());
    getAllProduct();
    getCategory();
    setLoading(false);
  }, [storeId]);

  const getCategory = async () => {
    try {
      const response = await callAPI.get("/category");
      console.log("Ini response get category :", response.data.result);
      setCategory(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async (id: string) => {
    try {
      const response = await callAPI.get(`product?store=${id}`);
      const data = response.data.result.products;
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProduct = async () => {
    try {
      const response = await callAPI.get(`product`);
      const data = response.data.result.products;
      // Get the product IDs from the store-specific products
      const productIds = new Set(products.map((p: any) => p.product_id));

      // Filter out products that exist in `products`
      const filteredProducts = data.filter(
        (p: any) => !productIds.has(p.product_id),
      );

      setAllProducts(filteredProducts);
      // setAllProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("Filtered product: ", allProducts);

  return (
    <>
      <HeaderDashboard pagename="Stock Management" />
      <div className="flex h-full w-full flex-col gap-5 p-5">
        <div className="informasi flex h-1/5 w-full rounded-lg bg-gradient-to-r from-green-300 to-green-200">
          <div className="profile flex h-full w-full flex-col items-start justify-center px-20">
            <h2 className="text-2xl font-bold">Welcome, Name!</h2>
            <h2 className="text-lg">Manage or see stock information here.</h2>
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
          <div className="store selection">
            <FilterBoxStoreSelector setStoreId={setStoreId} />
          </div>
          <div className="data">
            <DataTable
              columns={columns(setAction, setProductId, setOpenDialog)}
              data={products}
            />
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogContent>
                {action === "Delete" && (
                  <>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <p>This action cannot be undone.</p>
                    <Button>Confirm Delete</Button>
                  </>
                )}
                {action === "Add" && (
                  <>
                    <DialogTitle>Add New Product Stock</DialogTitle>
                    <AddNewStock
                      products={allProducts}
                      setOpenDialog={setOpenDialog}
                    />
                  </>
                )}
                {action === "Category" && (
                  <>
                    <DialogTitle>Add, edit, delete category</DialogTitle>
                    {/* <AddEditCategory /> */}
                  </>
                )}
                {action === "Edit" && (
                  <>
                    <DialogTitle>Edit Product</DialogTitle>
                    <EditStock
                      products={allProducts.find(
                        (p: any) => p.product_id === productId,
                      )}
                      setOpenDialog={setOpenDialog}
                    />
                  </>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default stockPage;
