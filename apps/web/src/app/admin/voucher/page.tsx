"use client";

import HeaderDashboard from "../components/header";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { callAPI } from "@/config/axios";
import { useToast } from "@/hooks/use-toast";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { get } from "react-hook-form";
import { set } from "zod";
import { columns } from "./components/column";
import AddVoucherOngkir from "./components/voucherOngkir/AddVoucherOngkir";
import AddVoucherProduct from "./components/voucherProduct/AddVoucherProduct";
import AddVoucherStore from "./components/voucherStore/AddVoucherStore";
import { DataTable } from "./components/data-table";

const stockPage = () => {
  const [action, setAction] = useState<string | null>("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [category, setCategory] = useState<any>([]);
  const [storeId, setStoreId] = useState<any>(null);
  const [products, setProducts] = useState<any>([]);
  const [voucherId, setVoucherId] = useState<number>(0);
  const [allProducts, setAllProducts] = useState<any>([]);
  const [allStore, setAllStore] = useState<any>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [allVoucher, setAllVoucher] = useState<any>([]);
  const [productEdit, setproductEdit] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const searchParams = useSearchParams();

  //   useEffect(() => {
  //     const params = searchParams.toString();
  //     getProduct(storeId.toString(), params);
  //     console.log("Query parameters:", params);
  //   }, [searchParams, storeId]);

  useEffect(() => {
    getAllVoucher();
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

  const getAllVoucher = async () => {
    try {
      const response = await callAPI.get("/voucher");
      console.log("Ini response get all voucher : ", response.data.result);
      const formattedData = response.data.result.map((voucher: any) => {
        let voucherCode =
          voucher.voucher_store_code ||
          voucher.voucher_ongkir_code ||
          voucher.voucher_product_code;
        let storeOrProduct =
          voucher.store?.store_name || voucher.product?.product_name || "N/A";
        let discountPercentage = voucher.voucher_store_amount_percentage
          ? `${voucher.voucher_store_amount_percentage}%`
          : "Not applicable";
        let discountNominal =
          voucher.voucher_store_exact_nominal ||
          voucher.voucher_ongkir_nominal ||
          "Not Applicable";

        return {
          voucher_code: voucherCode,
          type: voucher.type.toUpperCase(),
          storeOrProduct: storeOrProduct,
          discount_percentage: discountPercentage,
          discount_nominal: discountNominal,
          start_date: new Date(
            voucher.voucher_store_startdate ||
              voucher.voucher_ongkir_startdate ||
              voucher.voucher_product_startdate,
          ).toLocaleDateString(),
          end_date: new Date(
            voucher.voucher_store_enddate ||
              voucher.voucher_ongkir_enddate ||
              voucher.voucher_product_enddate,
          ).toLocaleDateString(),
        };
      });
      console.log("FORMATTED VOUCHER: ", formattedData);
      setAllVoucher(formattedData);
    } catch (error) {
      console.log("Error get all voucher : ", error);
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
      // setStoreId(8);
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
            <h2 className="text-lg">Manage or see voucher information here.</h2>
          </div>
          <div className="flex h-full w-full items-center justify-center gap-5 px-20">
            <Button
              onClick={() => {
                setOpenDialog(true);
                setAction("Add-Voucher-Ongkir");
              }}
            >
              Add New Ongkir Voucher
            </Button>
            <Button
              onClick={() => {
                setOpenDialog(true);
                setAction("Add-Voucher-Product");
              }}
            >
              Add New Product Voucher
            </Button>
            <Button
              onClick={() => {
                setOpenDialog(true);
                setAction("Add-Voucher-Store");
              }}
            >
              Add New Store Voucher
            </Button>
          </div>
        </div>
        <div className="main flex h-full w-full gap-5">
          <div className="flex h-fit w-full gap-2">
            <div className="store selection"></div>
            <div className="data">
              <div className="searchbox h-14 w-full rounded-lg"></div>
              <div className="table h-fit w-full rounded-lg shadow-sm">
                <DataTable
                  columns={columns(setAction, setVoucherId, setOpenDialog)}
                  data={allVoucher}
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
                    {action === "Add-Voucher-Ongkir" && (
                      <>
                        <DialogTitle>Add New Ongkir Voucher</DialogTitle>
                        <AddVoucherOngkir
                          store_id={storeId}
                          setOpenDialog={setOpenDialog}
                          allStore={allStore}
                        />
                      </>
                    )}
                    {action === "Edit-Voucher-Ongkir" && (
                      <>
                        <DialogTitle>Edit Ongkir Voucher</DialogTitle>
                        {/* <AddEditCategory /> */}
                      </>
                    )}
                    {action === "Delete-Voucher-Ongkir" && (
                      <>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <p>This action cannot be undone.</p>
                        <Button>Confirm Delete</Button>
                      </>
                    )}
                    {action === "Edit" && (
                      <>
                        <DialogTitle>Edit Product</DialogTitle>
                      </>
                    )}
                    {action === "Add-Voucher-Product" && (
                      <>
                        <DialogTitle>Edit Product</DialogTitle>
                        <AddVoucherProduct
                          allProduct={allProducts}
                          setOpenDialog={setOpenDialog}
                        />
                      </>
                    )}
                    {action === "Add-Voucher-Store" && (
                      <>
                        <DialogTitle>Add New Voucher Store</DialogTitle>
                        <AddVoucherStore
                          allStore={allStore}
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
