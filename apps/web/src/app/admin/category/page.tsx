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

const categoryPage = () => {
  const { toast } = useToast();

  const [action, setAction] = useState<string | null>("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [category, setCategory] = useState<any>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      const response = await callAPI.get("/category");
      console.log("Ini response get category :", response.data.result);
      const newResponse = response.data.result.map((product: any) => ({
        ...product,
        status: product.deletedAt ? `Deleted` : "Active",
      }));
      setCategory(newResponse);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const deleteCategory = async (id: any) => {
    try {
      const response = await callAPI.patch("/category/delete", {
        id: id,
      });
      if (response.data.isSuccess) {
        toast({
          title: "Success",
          description: "Updating Category Success",
          className: "bg-gradient-to-r from-green-300 to-green-200",
        });
      }
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
    <>
      <HeaderDashboard pagename="Product Management" />
      <div className="flex h-full w-full flex-col gap-5 p-5">
        <div className="informasi flex h-1/5 w-full rounded-lg bg-gradient-to-r from-green-300 to-green-200">
          <div className="profile flex h-full w-full flex-col items-start justify-center px-20">
            <h2 className="text-2xl font-bold">Welcome, Name!</h2>
            <h2 className="text-lg">Manage or see category here.</h2>
          </div>
          <div className="flex h-full w-full flex-col items-end justify-center gap-5 px-20">
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
        <div className="main flex h-full w-full gap-5">
          <div className="mainpart flex h-full w-full flex-col gap-5">
            <div className="searchbox h-14 w-full rounded-lg">
              <Input
                type="text"
                placeholder="Search here..."
                className="h-full px-7"
              />
            </div>
            <div className="flex flex-col gap-8">
              <div className="table h-fit w-full rounded-lg shadow-sm">
                {loading ? (
                  <DataTable
                    columns={columns(setAction, setCategoryId, setOpenDialog)}
                    data={[]}
                  />
                ) : (
                  <DataTable
                    columns={columns(setAction, setCategoryId, setOpenDialog)}
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
                        <AddCategory />
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
                          />
                        )}
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

export default categoryPage;
