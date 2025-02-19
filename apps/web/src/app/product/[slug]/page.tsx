"use client";

import { callAPI } from "@/config/axios";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

interface IProductDetailPage {
  params: Promise<{ slug: string }>;
}

const detailProductPage: React.FC<IProductDetailPage> = ({ params }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);
  const [productData, setProductData] = useState<any>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async (): Promise<void> => {
    try {
      setLoading(true);
      const slug = (await params).slug;
      console.log("getting data");
      const response = await callAPI.get(`product/${slug}`);
      console.log(response);
      setProductData(response.data.result);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  console.log("product data", productData);

  const formatRupiah = (amount: any) => {
    return `Rp. ${amount.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  //KURANG BIKIN SKELETON (PAKAI LOADING STATE)

  return (
    <div className="grid h-full w-full grid-cols-1 gap-5 p-7 lg:grid-cols-3 lg:px-20 lg:py-10">
      <div className="title and image h-full w-full p-2 lg:col-span-2 lg:px-20 lg:py-10">
        <img
          className="h-fit w-full rounded-md shadow-sm lg:h-fit lg:w-full"
          src={
            productData?.product_img?.length
              ? productData.product_img[0].image_url
              : ""
          }
        />

        <div className="flex items-center justify-between py-2 lg:py-5">
          <h1 className="py-3 text-3xl font-bold lg:py-2 lg:font-semibold">
            {productData.product_name}
          </h1>
          <h1 className="py-3 text-lg font-bold lg:py-2 lg:text-lg lg:font-semibold">
            {formatRupiah(parseInt(productData.product_price))}
          </h1>
        </div>
        <h1 className="pb-4 text-lg font-bold lg:text-lg lg:font-semibold">
          Available Stock : {productData.stock ? productData.stock : "0"}
        </h1>
        <div className="description text-sm lg:text-base">
          <h1>{productData.product_description}</h1>
        </div>
        <div className="flex gap-2 py-10 text-lg lg:py-8">
          <Badge>
            CATEGORY{" "}
            {productData.product_category?.product_category_name.toUpperCase()}
          </Badge>
        </div>
      </div>
      <div className="product cart h-full w-full bg-blue-700 lg:col-span-1 lg:px-20 lg:py-10">
        TOMBOL ADD TO CART HERE
      </div>
    </div>
  );
};

export default detailProductPage;
