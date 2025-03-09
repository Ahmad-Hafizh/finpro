"use client";
import HeaderDashboard from "../components/header";
import PaginationTable from "../components/Pagination";
import { Button } from "@/components/ui/button";
import { useState, useEffect, Suspense } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import AddProduct from "./components/AddProduct";
import { DataTable } from "./components/data-table";
import { columns } from "./components/column";
import AddEditCategory from "./components/AddEditCategory";
import EditProduct from "./components/EditProduct";
import FilterBox from "./components/FilterBox";
import SearchBox from "./components/SearchBox";
import { callAPI } from "@/config/axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import SortBox from "./components/SortBox";
import { useSession } from "next-auth/react";

const productPage = () => {
  const [action, setAction] = useState<string | null>("");
  const [productId, setProductId] = useState<number>(0);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [categories, setCategories] = useState<any>([]);
  const [productList, setProductList] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);
  const [editedData, setEditedData] = useState<any>([]);

  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data: session } = useSession();
  console.log("INI DATA ADMIN : ", session);

  useEffect(() => {
    if (session?.user.role === "super_admin") {
      setIsSuperAdmin(true);
    }
  }, [session]);

  useEffect(() => {
    getCategory();
    getProduct();
  }, [searchParams]);

  useEffect(() => {
    filteredData(productId);
  }, [productId]);

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

  const getCategory = async () => {
    try {
      const response = await callAPI.get("/category");
      console.log("Ini response get category :", response.data.result);
      setCategories(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async () => {
    try {
      const queryParams = searchParams.toString();
      const response = await callAPI.get(`/product?${queryParams}`);
      console.log("Ini response get product :", response.data.result.products);
      const newResponse = response.data.result.products.map((product: any) => ({
        ...product,
        status: product.deletedAt ? `Deleted` : "Active",
      }));
      setProductList(newResponse);
      setTotalPage(response.data.result.totalPages);
    } catch (error) {
      console.log("Ini error get product: ", error);
    }
  };

  const deleteProduct = async (id: any) => {
    try {
      const response = await callAPI.patch(
        "/product/delete",
        {
          product_id: id,
        },
        { headers: { Authorization: `Bearer ${session?.user.auth_token}` } },
      );
      if (response.data.isSuccess) {
        toast({
          title: "Success",
          description: "Deleting Product Success",
          className: "bg-gradient-to-r from-green-300 to-green-200",
        });
      }
      setTimeout(() => {
        window.location.reload();
      }, 500);
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
  console.log("Ini product list:", productList);

  const fetchUserData = [
    {
      auth_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFobWFkbWF1bGFuYWhhZml6aDYzQGdtYWlsLmNvbSIsImlkIjoiY203Mzc0M25jMDAwMHR4dDhob2xiZm8yZCIsImlhdCI6MTc0MTA5OTQ2MiwiZXhwIjoxNzQxMTAzMDYyfQ.qv54PjhllPYVQswCfvD-WwlfY8felF5pf1Dl_dT36dM",
      email: "ahmadmaulanahafizh63@gmail.com",
      image: null,
      isOauth: false,
      name: "ahmad",
      role: "user",
    },
    {
      auth_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFobWFkbWF1bGFuYWhhZml6aDYzQGdtYWlsLmNvbSIsImlkIjoiY203Mzc0M25jMDAwMHR4dDhob2xiZm8yZCIsImlhdCI6MTc0MTA5OTQ2MiwiZXhwIjoxNzQxMTAzMDYyfQ.qv54PjhllPYVQswCfvD-WwlfY8felF5pf1Dl_dT36dM",
      email: "ahmadmaulanahafizh63@gmail.com",
      image: null,
      isOauth: false,
      name: "satrio",
      role: "admin",
    },
    {
      auth_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFobWFkbWF1bGFuYWhhZml6aDYzQGdtYWlsLmNvbSIsImlkIjoiY203Mzc0M25jMDAwMHR4dDhob2xiZm8yZCIsImlhdCI6MTc0MTA5OTQ2MiwiZXhwIjoxNzQxMTAzMDYyfQ.qv54PjhllPYVQswCfvD-WwlfY8felF5pf1Dl_dT36dM",
      email: "ahmadmaulanahafizh63@gmail.com",
      image: null,
      isOauth: false,
      name: "satrio",
      role: "super_admin",
    },
  ];

  const filteredData = async (productId: any) => {
    const newData =
      productList.find((product: any) => product.product_id === productId) ||
      null;
    setEditedData(newData);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeaderDashboard pagename="Product Management" />
      <div className="flex h-full w-full flex-col gap-5 p-5">
        <div className="informasi flex h-1/5 w-full rounded-lg bg-gradient-to-r from-green-300 to-green-200 py-20">
          <div className="profile flex h-full w-full flex-col items-start justify-center px-20">
            <h2 className="text-2xl font-bold">
              Welcome, {session?.user.name}!
            </h2>
            <h2 className="text-lg">Manage or see product information here.</h2>
          </div>
          <div className="flex h-full w-full flex-col items-end justify-center gap-5 px-20">
            {isSuperAdmin ? (
              <Button
                onClick={() => {
                  setOpenDialog(true);
                  setAction("Add");
                }}
              >
                Add new product
              </Button>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="main flex h-full w-full gap-5">
          {categories ? <FilterBox categories={categories} /> : <></>}
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
                  columns={columns(
                    setAction,
                    setProductId,
                    setOpenDialog,
                    isSuperAdmin,
                  )}
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
                          token={session?.user.auth_token as string}
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
                        <EditProduct
                          productData={editedData}
                          token={session?.user.auth_token as string}
                          setOpenDialog={setOpenDialog}
                        />
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
    </Suspense>
  );
};

export default productPage;
