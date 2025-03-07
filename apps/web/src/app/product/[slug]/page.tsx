"use client";

import { callAPI } from "@/config/axios";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

//===========================
import { fetchCartItems, fetchCartCount } from "@/lib/redux/reducers/cartSlice";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/redux/hooks";
//===============================

interface IProductDetailPage {
  params: Promise<{ slug: string }>;
}

const detailProductPage: React.FC<IProductDetailPage> = ({ params }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);
  const [productData, setProductData] = useState<any>([]);
  const [stock, setStock] = useState<any>([]);

  //==========================
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { updateCart } = useCart();
  const router = useRouter();
  //===========================

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log("INI STOCK : ", stock);
  }, [stock]);

  const getData = async (): Promise<void> => {
    try {
      setLoading(true);
      const slug = (await params).slug;
      console.log("getting data");
      const response = await callAPI.get(`product/${slug}`);
      // console.log("Ini response data:", response.data.result.stock);

      const product = response.data.result;

      const updatedStock = await Promise.all(
        product.stock.map(async (item: any) => ({
          ...item,
          store_name: await getStore(item.store_id),
        })),
      );

      setProductData(product);
      setLoading(false);
      // setStock(response.data.result.stock);
      setStock(updatedStock);
    } catch (error) {
      setError(error);
    }
  };

  const getStore = async (id: any) => {
    try {
      const payload = { store_id: id };
      const response = await callAPI.post("/store/get-id", payload);
      console.log("RESPONSE DATA : ", response.data.result);
      return response.data.result.store_name;
    } catch (error) {}
  };

  // const formatStore = async () => {
  //   const updatedStock = await Promise.all(
  //     stock.map(async (item: any) => ({
  //       ...item,
  //       store_name: await getStore(item.store_id),
  //     })),
  //   );
  // };

  console.log("product data", productData);
  console.log("store data", stock);

  const formatRupiah = (amount: any) => {
    return `Rp. ${amount.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  //KURANG BIKIN SKELETON (PAKAI LOADING STATE)
  //==============================================
  const handleAddToCart = async () => {
    if (isAdding) return;
    try {
      setIsAdding(true);
      await callAPI.post("/cart", {
        product_id: productData?.product_id,
        quantity: quantity,
      });
      await Promise.all([
        dispatch(fetchCartItems()).unwrap(),
        dispatch(fetchCartCount()).unwrap(),
      ]);
      updateCart("add_item");
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      alert("Something went wrong while adding the product to your cart.");
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !productData) {
    return <div>Error loading product details.</div>;
  }
  //===============================
  return (
    <div className="grid h-full w-full grid-cols-1 gap-5 p-7 lg:grid-cols-3 lg:px-20 lg:py-20">
      <div className="title and image h-full w-full p-2 lg:col-span-2 lg:px-20 lg:py-10">
        {/* <img
          className="h-fit w-full rounded-md shadow-sm lg:h-fit lg:w-full"
          src={
            productData?.product_img?.length
              ? productData.product_img[0].image_url
              : ""
          }
        /> */}
        {/* aku ganti ini dulu soalnya td error kalo kosong src nya */}
        {productData?.product_img?.length ? (
          <img
            className="h-fit w-full rounded-md shadow-sm lg:h-fit lg:w-full"
            src={productData.product_img[0].image_url}
            alt={productData.product_name}
          />
        ) : null}
        {/* ======================================================= */}

        <div className="flex items-center justify-between py-2 lg:py-5">
          <h1 className="py-3 text-3xl font-bold lg:py-2 lg:font-semibold">
            {productData.product_name}
          </h1>
          <h1 className="py-3 text-lg font-bold lg:py-2 lg:text-lg lg:font-semibold">
            {formatRupiah(parseInt(productData.product_price))}
          </h1>
        </div>
        <div className="description text-sm lg:text-base">
          <h1>{productData.product_description}</h1>
        </div>
        <div className="flex gap-2 py-10 text-lg lg:py-8">
          <Badge>
            CATEGORY{" "}
            {productData.product_category?.product_category_name.toUpperCase()}
          </Badge>
        </div>
        <div className="flex flex-col gap-2 py-10 text-lg lg:py-8">
          {stock.length ? <h1>AVAILABLE IN :</h1> : <></>}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {stock.length ? (
              stock.map((stock: any) => {
                return (
                  <Card
                    key={stock.stock_id}
                    className="flex items-center justify-center"
                  >
                    <CardContent className="flex flex-col items-center justify-center py-3">
                      <h1 className="text-center text-xs">
                        {stock.store_name} :
                      </h1>
                      <h1 className="text-xs">{stock.quantity} Pcs</h1>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <h1 className="flex">STOCK EMPTY</h1>
            )}
          </div>
        </div>
      </div>
      <div className="product cart h-full w-full lg:col-span-1 lg:px-20 lg:py-10">
        {/* TOMBOL ADD TO CART HERE */}
        {/* -------------------------------------- */}
        <div className="rounded border bg-white p-4 shadow-sm">
          <h3 className="mb-4 text-xl font-medium">Add to Cart</h3>
          <div className="mt-2 flex items-center space-x-2">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-16 rounded border p-1"
              disabled={isAdding}
            />
            <button
              onClick={handleAddToCart}
              className={`rounded bg-[#80ED99] px-4 py-2 text-black hover:bg-[#60cd79] ${
                isAdding ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={isAdding}
            >
              {isAdding ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>
        {/* --------------------------- */}
      </div>
    </div>
  );
};

export default detailProductPage;
