"use client";

import SearchBox from "./components/SearchBox";
import FilterBox from "./components/FilterBox";
import ProductCardExplore from "./components/ProductCard";
import { useState, useEffect } from "react";
import { callAPI } from "@/config/axios";
import { useSearchParams, useRouter } from "next/navigation";
import PaginationTable from "../admin/components/Pagination";

const explorePage = () => {
  const [categories, setCategories] = useState<any>([]);
  const [products, setProducts] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    getCategory();
    getProduct();
  }, [searchParams]);

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
      console.log("Ini response get category :", response.data);
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async () => {
    try {
      const queryParams = searchParams.toString();
      const response = await callAPI.get(`/product?${queryParams}`);
      console.log("Ini response get product :", response.data.result);
      setProducts(response.data.result.products);
      setTotalPage(response.data.result.totalPages);
    } catch (error) {
      console.log("Ini error get product: ", error);
    }
  };

  const category = [
    { product_category_id: 1, product_category_name: "Nut and Snacks" },
    { product_category_id: 2, product_category_name: "Fruit" },
    { product_category_id: 3, product_category_name: "Wet vegetable" },
    { product_category_id: 4, product_category_name: "Green vegetable" },
    { product_category_id: 5, product_category_name: "Nut" },
  ];

  return (
    <div className="flex h-full w-full flex-col gap-5 p-7 lg:p-10">
      <div className="searchbox h-full w-full">
        <SearchBox />
      </div>
      <div className="main section flex flex-col lg:flex-row">
        <div className="filterbox h-full w-full lg:w-[400px]">
          <FilterBox categories={category} />
        </div>
        <div className="product-section grid grid-cols-1 gap-5 px-5 lg:grid-cols-4 lg:px-10">
          {products ? (
            products.map((product: any) => {
              return (
                <ProductCardExplore
                  key={product.product_id}
                  product_name={product.product_name}
                  product_price={product.product_price}
                />
              );
            })
          ) : (
            <div>LOADING</div>
          )}
        </div>
      </div>
      <div>
        <PaginationTable currentPage={currentPage} totalPage={totalPage} />
      </div>
    </div>
  );
};

export default explorePage;
