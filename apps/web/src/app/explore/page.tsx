"use client";

import SearchBox from "./components/SearchBox";
import FilterBox from "./components/FilterBox";
import ProductCardExplore from "./components/ProductCard";
import { useState, useEffect, Suspense } from "react";
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
      setCategories(response.data.result);
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
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex h-full w-full flex-col gap-5 p-7 lg:p-10">
        <div className="searchbox h-full w-full">
          <SearchBox />
        </div>
        <div className="main section flex flex-col lg:flex-row">
          <div className="filterbox h-full w-full lg:w-[400px]">
            <FilterBox categories={categories} />
          </div>
          <div className="product-section grid grid-cols-1 gap-5 px-5 lg:grid-cols-4 lg:px-10">
            {products.length > 0 ? (
              products.map((product: any) => {
                return (
                  <ProductCardExplore
                    key={product.product_id}
                    product_name={product.product_name}
                    product_price={product.product_price}
                    product_category={
                      product.product_category.product_category_name
                    }
                    product_image={
                      Array.isArray(product.product_img) &&
                      product.product_img.length > 0
                        ? product.product_img[0].image_url
                        : "https://media.post.rvohealth.io/wp-content/uploads/sites/3/2022/02/health_benefits_carrots_732x549_thumb-732x549.jpg"
                    }
                  />
                );
              })
            ) : (
              <div>NOT FOUND</div>
            )}
          </div>
        </div>
        <div>
          <PaginationTable currentPage={currentPage} totalPage={totalPage} />
        </div>
      </div>
    </Suspense>
  );
};

export default explorePage;
