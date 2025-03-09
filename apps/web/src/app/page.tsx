/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { CategoryCarousel } from "@/components/global/CategoryCarousel";
import { LargeCarousel } from "@/components/global/LargeCarousel";
import { ProductCarousel } from "@/components/global/ProductCarousel";
import { callAPI } from "@/config/axios";
import { useState, useEffect } from "react";
// import StorePick from "@/components/global/StorePick";
import Link from "next/link";

const Home = () => {
  const [product, setProduct] = useState<any>([]);
  const [banner, setBanner] = useState<any>([]);
  const [categories, setCategory] = useState<any>([]);

  const getProducts = async () => {
    try {
      const response = await callAPI.get("/product/landing");
      setProduct(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  const getBanner = async () => {
    try {
      const response = await callAPI.get("/voucher/banner");
      setBanner(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  const getCategory = async () => {
    try {
      const response = await callAPI.get("/category");
      setCategory(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
    getBanner();
    getCategory();
  }, []);

  return (
    <div className="flex flex-col gap-6 py-24">
      {/* <StorePick /> */}
      <div className="overflow-hidden rounded-xl md:px-0">
        <LargeCarousel banner={banner} />
      </div>
      <div className="hidden flex-col gap-2 md:flex">
        <p className="text-lg md:text-xl">Categories</p>
        <CategoryCarousel categories={categories} />
      </div>
      {product.map((e: any, i: number) => (
        <div className="flex flex-col gap-2" key={i}>
          <div className="flex w-full justify-between">
            <p className="text-lg md:text-xl">{e.product_category_name}</p>
            <Link href={`/explore?cat=${encodeURI(e.product_category_name)}`}>
              see all
            </Link>
          </div>
          <ProductCarousel products={e.product} />
        </div>
      ))}
    </div>
  );
};
export default Home;
