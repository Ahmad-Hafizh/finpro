"use client";

import HeaderDashboard from "../components/header";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { callAPI } from "@/config/axios";
import FilterBoxStoreSelector from "./components/FilterBoxStoreSelector";
import { DataTable } from "./components/data-table";
import { columns } from "./components/column";
import AddNewStock from "./components/AddNewStock";
import EditStock from "./components/EditStock";
import { useSearchParams, useRouter } from "next/navigation";
import SearchBox from "./components/SearchBox";
import { useSession } from "next-auth/react";
import PaginationTable from "../components/Pagination";

const stockPage = () => {
  const [action, setAction] = useState<string | null>("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [category, setCategory] = useState<any>([]);
  const [storeId, setStoreId] = useState<any>(null);
  const [products, setProducts] = useState<any>([]);
  const [productId, setProductId] = useState<number>(0);
  const [allProducts, setAllProducts] = useState<any>([]);
  const [allStore, setAllStore] = useState<any>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [productEdit, setproductEdit] = useState<any>([]);
  const [adminInfo, setAdminInfo] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const router = useRouter();

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

  useEffect(() => {
    const params = searchParams.toString();
    if (storeId) {
      getProduct(storeId.toString(), params);
      getProductForEdit(storeId.toString(), params);
    }
  }, [searchParams, storeId]);

  useEffect(() => {
    getAllProduct(products);
  }, [products]);

  useEffect(() => {
    getAdminInfo();
  }, [session]);

  useEffect(() => {}, [session]);

  useEffect(() => {
    getAllStore();
    getCategory();
    setLoading(false);
  }, [storeId]);

  useEffect(() => {
    const selectedProduct = productEdit.find(
      (p: any) => p.product_id === productId && p.store_id === storeId,
    );
  }, [productEdit, productId]);

  const getCategory = async () => {
    try {
      const response = await callAPI.get("/category");
      setCategory(response.data.result);
    } catch (error) {}
  };

  const getAdminInfo = async () => {
    try {
      const payload = { email: session?.user.email };
      const response = await callAPI.post("/admin/detail", payload);
      setAdminInfo(response.data.result);
      if (response.data.result[0]?.store_id) {
        setStoreId(response.data.result[0]?.store_id);
      }
    } catch (error) {}
  };

  const getProduct = async (id: string, params: string) => {
    try {
      const response = await callAPI.get(`product?store=${id}&${params}`);
      const data = response.data.result.products;
      const filteredProducts = data.filter(
        (product: any) => product.deletedAt === null,
      );
      setProducts(filteredProducts);
      setTotalPage(response.data.result.totalPages);
    } catch (error) {}
  };

  const getAllProduct = async (currentProduct: any) => {
    try {
      const response = await callAPI.get(`product/dropdown`);
      const data = response.data.result.products;
      const productIds = currentProduct.map((p: any) => p.product_id);
      const filteredProducts = data.filter(
        (p: any) => !productIds.includes(p.product_id),
      );
      setAllProducts(filteredProducts);
    } catch (error) {}
  };

  const getProductForEdit = async (id: any, params: any) => {
    try {
      const response = await callAPI.get(`/product?${id}&${params}`);
      const data = response.data.result.products;
      setproductEdit(data);
      const selectedProduct = productEdit.find(
        (p: any) => p.product_id === productId,
      );
    } catch (error) {}
  };

  const getAllStore = async () => {
    try {
      const response = await callAPI.get("/stock/store");
      const data = response.data.result;
      setAllStore(data);
    } catch (error) {}
  };

  return (
    <>
      <HeaderDashboard pagename="Stock Management" />
      <div className="flex h-full w-full flex-col gap-5 p-5">
        <div className="informasi flex h-1/5 w-full rounded-lg bg-gradient-to-r from-green-300 to-green-200 py-20">
          <div className="profile flex h-full w-full flex-col items-start justify-center px-20">
            <h2 className="text-2xl font-bold">
              Welcome, {session?.user.name}!
            </h2>
            <h2 className="text-lg">Manage or see stock information here.</h2>
          </div>
          <div className="flex h-full w-full flex-col items-end justify-center gap-5 px-20">
            {storeId ? (
              <Button
                onClick={() => {
                  setOpenDialog(true);
                  setAction("Add");
                }}
              >
                Add new stock
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setOpenDialog(true);
                  setAction("Add");
                }}
                disabled
              >
                Add new stock
              </Button>
            )}
          </div>
        </div>
        <div className="main flex h-full w-full gap-5">
          <div className="flex h-fit w-full gap-2">
            <div className="store selection">
              <FilterBoxStoreSelector
                setStoreId={setStoreId}
                allStore={allStore}
                categories={category}
                adminInfo={adminInfo}
              />
            </div>
            <div className="data w-full">
              <div className="searchbox mb-3 h-14 w-full rounded-lg">
                <SearchBox />
              </div>
              <div className="table h-fit w-full rounded-lg shadow-sm">
                <DataTable
                  columns={columns(
                    setAction,
                    setProductId,
                    setOpenDialog,
                    storeId,
                    session?.user.auth_token,
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
                          token={session?.user.auth_token}
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
                          products={(() => {
                            const selectedProduct = productEdit.find(
                              (p: any) => p.product_id === productId,
                            );
                            return selectedProduct;
                          })()}
                          store_id={storeId}
                          setOpenDialog={setOpenDialog}
                          token={session?.user.auth_token}
                        />
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
              <div className="pagination flex items-center justify-center py-3">
                <PaginationTable
                  currentPage={currentPage}
                  totalPage={totalPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default stockPage;
