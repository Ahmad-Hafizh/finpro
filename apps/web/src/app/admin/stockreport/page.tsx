"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import HeaderDashboard from "../components/header";
import FilterBoxStoreSelector from "./components/FilterBoxStoreSelector";
import SearchBox from "./components/SearchBox";
import { DataTable } from "./components/data-table";
import { columns } from "./components/column";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PaginationTable from "../components/Pagination";
import { callAPI } from "@/config/axios";
import SortBox from "./components/SortBox";
import SortBoxTotal from "./components/SortBoxTotal";

const stockReportPage = () => {
  const [action, setAction] = useState<string | null>("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [category, setCategory] = useState<any>([]);
  const [storeId, setStoreId] = useState<number>(1);
  const [products, setProducts] = useState<any>([]);
  const [productId, setProductId] = useState<number>(0);
  const [allProducts, setAllProducts] = useState<any>([]);
  const [allStore, setAllStore] = useState<any>([]);
  const [openDialog, setOpenDialog] = useState<any>("");
  const [journal, setJournal] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [totalData, setTotalData] = useState<any>({});

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const monthParam = searchParams.get("month");
    const storeParam = searchParams.get("store");

    console.log("month queryy:", monthParam);
    const monthQuery = monthParam ? `month=${monthParam}` : "";
    const storeQuery = storeParam ? `store=${storeParam}` : "";

    fetchDataTotal(monthQuery, storeQuery);
  }, [searchParams]);

  useEffect(() => {
    getAllProduct();
  }, []);

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
    fetchData(params);
  }, [searchParams]);

  const fetchDataTotal = async (month?: string, store?: string) => {
    try {
      const response = await callAPI.get(
        `/stockreport/total?${month}&${store}`,
      );
      console.log("ini response total: ", response.data.result);
      setTotalData(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async (params: string) => {
    try {
      const response = await callAPI.get(`/stockreport?${params}`);
      console.log("ini rd: ", response.data.result);
      setJournal(response.data.result.stockReport);
      setTotalPage(response.data.result.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategory = async () => {
    try {
      const response = await callAPI.get("/category");
      console.log("Ini response get category :", response.data.result);
      setCategory(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllStore();
    console.log("Ini store IDIDIDIDI : ", storeId);
    getCategory();
    console.log("INI PRODUCTSSSS : ", products);
  }, [storeId]);

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

  const getAllProduct = async () => {
    try {
      const response = await callAPI.get(`product`);
      const data = response.data.result.products;
      setAllProducts(data);
      console.log("Ini response get all product :", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <HeaderDashboard pagename="Stock Report" />
      <div className="flex h-full w-full flex-col gap-5 p-5">
        <div className="informasi flex h-1/4 w-full rounded-lg bg-gradient-to-r from-green-300 to-green-200 py-10">
          <div className="profile flex h-full w-full flex-col items-start justify-center px-20">
            <h2 className="text-2xl font-bold">Welcome, Name!</h2>
            <h2 className="flex items-center justify-center gap-2 text-lg">
              Showing stock report data.
            </h2>
          </div>
          <div className="flex w-full flex-col items-end justify-center gap-5 px-10">
            <div className="main report flex h-fit w-full gap-5">
              <SortBoxTotal />
              <Card className="border border-none">
                <CardHeader>
                  <h1 className="text-lg font-bold">Current Stock</h1>
                </CardHeader>
                <CardContent>
                  <h1 className="text-3xl font-medium">
                    {totalData?.latestStockEntry?.stock_result
                      ? totalData?.latestStockEntry?.stock_result
                      : "0"}
                  </h1>
                  <h1 className="text-lg font-medium">Product</h1>
                </CardContent>
              </Card>
              <Card className="border border-none">
                <CardHeader>
                  <h1 className="text-lg font-bold">Total Stock Added</h1>
                </CardHeader>
                <CardContent>
                  <h1 className="text-3xl font-medium">
                    {totalData?.totalAddedStock?._sum?.quantity
                      ? totalData?.totalAddedStock?._sum?.quantity
                      : "0"}
                  </h1>
                  <h1 className="text-lg font-medium">Product</h1>
                </CardContent>
              </Card>
              <Card className="border border-none">
                <CardHeader>
                  <h1 className="text-lg font-bold">Total Stock Reduced</h1>
                </CardHeader>
                <CardContent>
                  <h1 className="text-3xl font-medium">
                    {totalData?.totalReducedStock?._sum?.quantity
                      ? totalData?.totalReducedStock?._sum?.quantity
                      : "0"}
                  </h1>
                  <h1 className="text-lg font-medium">Product</h1>
                </CardContent>
              </Card>
            </div>
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
              <div className="flex w-full gap-5">
                <div className="searchbox h-14 w-full rounded-lg">
                  <SearchBox />
                </div>
                <div className="searchbox h-14 w-full rounded-lg">
                  <SortBox />
                </div>
              </div>
              <div className="mb-4 table h-fit w-full rounded-lg shadow-sm">
                <DataTable
                  columns={columns(
                    setAction,
                    setProductId,
                    setOpenDialog,
                    storeId,
                  )}
                  data={journal}
                />
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
    </>
  );
};

export default stockReportPage;
