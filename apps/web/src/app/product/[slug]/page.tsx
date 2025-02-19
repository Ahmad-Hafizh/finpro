"use client";

import { Button } from "@/components/ui/button";
import { callAPI } from "@/config/axios";
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

  return (
    <div className="grid h-full w-full grid-cols-1 gap-5 p-7 lg:grid-cols-3 lg:p-10">
      <div className="title and image bg-blue-400 p-2 lg:col-span-2">
        <img
          className="h-1/2 w-1/2"
          src="https://assets.clevelandclinic.org/transform/871f96ae-a852-4801-8675-683191ce372d/Benefits-Of-Cabbage-589153824-770x533-1_jpg"
        />
        <h1>{productData.product_name}</h1>
        <h1>{productData.product_price}</h1>
        <h1>Available Stock : {productData.stock ? productData.stock : "0"}</h1>
        <div className="description">
          <h1>{productData.product_description}</h1>
        </div>
      </div>
      <div className="product cart h-full w-full lg:col-span-1">
        <Button></Button>
      </div>
    </div>
  );
};

export default detailProductPage;
