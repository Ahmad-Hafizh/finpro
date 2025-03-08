"use client";
import HeaderDashboard from "../components/header";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "./components/data-table";
import { columns } from "./components/column";
import { Input } from "@/components/ui/input";
import AddCategory from "./components/AddCategory";
import PaginationTable from "../components/Pagination";
import EditCategory from "./components/EditCategory";
import { callAPI } from "@/config/axios";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const categoryPage = () => {
  const { toast } = useToast();

  const [action, setAction] = useState<string | null>("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [category, setCategory] = useState<any>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const searchParams = useSearchParams();
  const route = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user.role === "super_admin") {
      setIsSuperAdmin(true);
    }
  }, [session]);

  const contohdata = {
    user: {
      name: "ahmad",
      email: "ahmadmaulanahafizh63@gmail.com",
      image:
        "https://res.cloudinary.com/dk2sik7oi/image/upload/v1741178616/profile_image/orqmtvbaspjhv6lglcy0.jpg",
      role: "super_admin",
      isOauth: false,
      auth_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFobWFkbWF1bGFuYWhhZml6aDYzQGdtYWlsLmNvbSIsImlkIjoiY203Mzc0M25jMDAwMHR4dDhob2xiZm8yZCIsImlhdCI6MTc0MTE5MDAwMSwiZXhwIjoxNzQxMTkzNjAxfQ.5ynLmmHM019YkXj3fub6UWoQHaqSKve34YaA1FfU7Rc",
    },
    expires: "2025-04-04T15:53:21.509Z",
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const pageNumber = parseInt(searchParams.get("page") || "1");

    if (!pageNumber !== currentPage.toString()) {
      setCurrentPage(pageNumber);
    }

    if (!params.has("page")) {
      params.set("page", "1");
      route.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [searchParams, route]);

  useEffect(() => {
    getCategory(currentPage);
  }, [currentPage]);

  const getCategory = async (page: any) => {
    try {
      const response = await callAPI.get(`/category?page=${page}`);
      console.log("Ini response get category :", response.data);
      const newResponse = response.data.result.result.map((product: any) => ({
        ...product,
        status: product.deletedAt ? `Deleted` : "Active",
      }));
      setTotalPage(
        response.data.result.totalPages ? response.data.result.totalPages : 1,
      );
      setCategory(newResponse);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const deleteCategory = async (id: any) => {
    try {
      const response = await callAPI.patch(
        "/category/delete",
        {
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.user.auth_token}`,
          },
        },
      );
      if (response.data.isSuccess) {
        toast({
          title: "Success",
          description: "Deleting Category Success",
          className: "bg-gradient-to-r from-green-300 to-green-200",
        });
      }
      setTimeout(() => {
        window.location.reload();
      }, 500);
      setOpenDialog(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while deleting category",
        variant: "destructive",
      });
      setOpenDialog(false);
      console.log("Ini error dari delete:", error);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeaderDashboard pagename="Product Management" />
      <div className="flex h-full w-full flex-col gap-5 p-5">
        <div className="informasi flex h-1/5 w-full rounded-lg bg-gradient-to-r from-green-300 to-green-200">
          <div className="profile flex h-full w-full flex-col items-start justify-center px-20">
            <h2 className="text-2xl font-bold">
              Welcome, {session?.user?.name}!
            </h2>
            <h2 className="text-lg">Manage or see category here.</h2>
          </div>
          <div className="flex h-full w-full flex-col items-end justify-center gap-5 px-20">
            {isSuperAdmin ? (
              <Button
                onClick={() => {
                  setOpenDialog(true);
                  setAction("Add");
                }}
              >
                Add new category
              </Button>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="main flex h-full w-full gap-5">
          <div className="mainpart flex h-full w-full flex-col gap-5">
            <div className="flex flex-col gap-8">
              <div className="table h-fit w-full rounded-lg shadow-sm">
                {loading ? (
                  <DataTable
                    columns={columns(
                      setAction,
                      setCategoryId,
                      setOpenDialog,
                      isSuperAdmin,
                    )}
                    data={[]}
                  />
                ) : (
                  <DataTable
                    columns={columns(
                      setAction,
                      setCategoryId,
                      setOpenDialog,
                      isSuperAdmin,
                    )}
                    data={category}
                  />
                )}

                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogContent>
                    {action === "Delete" && (
                      <>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <p>This action cannot be undone.</p>
                        <Button
                          onClick={() => {
                            deleteCategory(categoryId);
                          }}
                        >
                          Confirm Delete
                        </Button>
                      </>
                    )}
                    {action === "Add" && (
                      <>
                        <DialogTitle>Add Product</DialogTitle>
                        <AddCategory
                          setOpenDialog={setOpenDialog}
                          token={session?.user.auth_token as string}
                        />
                      </>
                    )}
                    {action === "Edit" && (
                      <>
                        <DialogTitle>Edit Product</DialogTitle>
                        {loading ? (
                          <EditCategory
                            setOpenDialog={setOpenDialog}
                            categoryData={{
                              product_category_id: 0,
                              product_category_name: "",
                            }}
                            token={session?.user.auth_token as string}
                          />
                        ) : (
                          <EditCategory
                            setOpenDialog={setOpenDialog}
                            categoryData={
                              category.find(
                                (cat: any) =>
                                  cat.product_category_id === categoryId,
                              ) || { id: 0, name: "" }
                            }
                            token={session?.user.auth_token as string}
                          />
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
    </Suspense>
  );
};

export default categoryPage;
