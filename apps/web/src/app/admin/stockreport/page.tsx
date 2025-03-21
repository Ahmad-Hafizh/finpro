/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useSession } from "next-auth/react";

const StockReportPage = () => {
  const [category, setCategory] = useState<any>([]);
  const [storeId, setStoreId] = useState<any>(null);
  const [allProducts, setAllProducts] = useState<any>([]);
  const [allStore, setAllStore] = useState<any>([]);
  const [journal, setJournal] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [totalData, setTotalData] = useState<any>({});
  const [adminInfo, setAdminInfo] = useState<any>([]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const monthParam = searchParams.get("month");
    const storeParam = searchParams.get("store");

    const monthQuery = monthParam ? `month=${monthParam}` : "";
    const storeQuery = storeParam ? `store=${storeParam}` : "";

    fetchDataTotal(monthQuery, storeQuery);
  }, [searchParams]);

  useEffect(() => {
    getAllProduct();
  }, []);

  useEffect(() => {
    getAdminInfo();
  }, [session]);
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

  useEffect(() => {
    if (adminInfo?.store_id) {
      const params = new URLSearchParams(searchParams.toString());

      if (!params.get("store")) {
        params.set("store", adminInfo.store_id.toString());
        router.replace(`?${params.toString()}`, { scroll: false });
      }
    }
  }, [adminInfo, searchParams, router]);

  const getAdminInfo = async () => {
    try {
      const payload = { email: session?.user.email };
      const response = await callAPI.post("/admin/detail", payload);

      const adminData = response.data.result;

      setAdminInfo(adminData);
    } catch (error) {}
  };

  const fetchDataTotal = async (month?: string, store?: string) => {
    try {
      const response = await callAPI.get(
        `/stockreport/total?${month}&${store}`,
      );
      setTotalData(response.data.result);
    } catch (error) {}
  };

  const fetchData = async (params: string) => {
    try {
      const response = await callAPI.get(`/stockreport?${params}`);
      setJournal(response.data.result.stockReport);
      setTotalPage(response.data.result.totalPages);
    } catch (error) {}
  };

  const getCategory = async () => {
    try {
      const response = await callAPI.get("/category");
      setCategory(response.data.result);
    } catch (error) {}
  };

  useEffect(() => {
    getAllStore();
    getCategory();
  }, [storeId]);

  const getAllStore = async () => {
    try {
      const response = await callAPI.get("/stock/store");
      const data = response.data.result;
      setAllStore(data);
    } catch (error) {}
  };

  const getAllProduct = async () => {
    try {
      const response = await callAPI.get(`product`);
      const data = response.data.result.products;
      setAllProducts(data);
    } catch (error) {}
  };

  return (
    <>
      <HeaderDashboard pagename="Stock Report" />
      <div className="flex h-full w-full flex-col gap-5 p-5">
        <div className="informasi flex h-1/4 w-full rounded-lg bg-gradient-to-r from-green-300 to-green-200 py-10">
          <div className="profile flex h-full w-full flex-col items-start justify-center px-20">
            <h2 className="text-2xl font-bold">
              Welcome, {session?.user.name}!
            </h2>
            <h2 className="flex items-center justify-center gap-2 text-lg">
              Showing stock report data.
            </h2>
          </div>
          <div className="flex w-full flex-col items-end justify-center gap-5 px-10">
            <div className="main report flex h-fit w-full gap-5">
              <Card className="border border-none">
                <CardHeader>
                  <h1 className="text-lg font-bold">Current Stock</h1>
                </CardHeader>
                <CardContent>
                  <h1 className="text-3xl font-medium">
                    {totalData?.stockTotal
                      ? totalData?.stockTotal?._sum?.quantity
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
                storeId={
                  adminInfo[0]?.store?.store_name
                    ? adminInfo[0]?.store?.store_name
                    : null
                }
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
                <DataTable columns={columns()} data={journal} />
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

export default StockReportPage;
