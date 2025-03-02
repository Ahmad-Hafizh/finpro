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
import AddNewStock from "./components/AddNewStock";
import EditStock from "./components/EditStock";
import { useSearchParams } from "next/navigation";
import { get } from "react-hook-form";
import SearchBox from "./components/SearchBox";
import { set } from "zod";

const stockPage = () => {
  const [action, setAction] = useState<string | null>("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [category, setCategory] = useState<any>([]);
  const [storeId, setStoreId] = useState<number>(1);
  const [products, setProducts] = useState<any>([]);
  const [productId, setProductId] = useState<number>(0);
  const [allProducts, setAllProducts] = useState<any>([]);
  const [allStore, setAllStore] = useState<any>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [productEdit, setproductEdit] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const searchParams = useSearchParams();

  useEffect(() => {
    const params = searchParams.toString();
    getProduct(storeId.toString(), params);
    console.log("Query parameters:", params);
  }, [searchParams, storeId]);

  useEffect(() => {
    getAllProduct(products);
    getProductForEdit();
  }, [products]);

  useEffect(() => {
    getAllStore();
    console.log("Ini store IDIDIDIDI : ", storeId);
    getCategory();
    console.log("INI PRODUCTSSSS : ", products);
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

  const getProduct = async (id: string, params: string) => {
    try {
      const response = await callAPI.get(`product?store=${id}&${params}`);
      const data = response.data.result.products;
      const filteredProducts = data.filter(
        (product: any) => product.deletedAt === null,
      );
      setProducts(filteredProducts);
      console.log("INI PRODUCTSSSS : ", filteredProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProduct = async (currentProduct: any) => {
    try {
      const response = await callAPI.get(`product`);
      const data = response.data.result.products;
      const productIds = currentProduct.map((p: any) => p.product_id);
      console.log("data : ", data);
      const filteredProducts = data.filter(
        (p: any) => !productIds.includes(p.product_id),
      );
      console.log("Ini response get all product : ", filteredProducts);
      setAllProducts(filteredProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductForEdit = async () => {
    try {
      const response = await callAPI.get("/product");
      const data = response.data.result.products;
      setproductEdit(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllStore = async () => {
    try {
      const response = await callAPI.get("/stock/store");
      const data = response.data.result;
      console.log("Ini response get all store : ", data);
      setAllStore(data);
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
              Add new stock
            </Button>
          </div>
        </div>
        <div className="main flex h-full w-full gap-5">
          <div className="flex h-fit w-full gap-2">
            <div className="store selection">
              <FilterBoxStoreSelector
                setStoreId={setStoreId}
                allStore={allStore}
                categories={category}
              />
            </div>
            <div className="data">
              <div className="searchbox h-14 w-full rounded-lg">
                <SearchBox />
              </div>
              <div className="table h-fit w-full rounded-lg shadow-sm">
                <DataTable
                  columns={columns(
                    setAction,
                    setProductId,
                    setOpenDialog,
                    storeId,
                  )}
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
                          store_id={storeId}
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
                          products={productEdit.find(
                            (p: any) => p.product_id === productId,
                          )}
                          store_id={storeId}
                          setOpenDialog={setOpenDialog}
                        />
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default stockPage;
