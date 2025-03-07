"use client";

import { callAPI } from "@/config/axios";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

//===========================
import { fetchCartItems, fetchCartCount } from "@/lib/redux/reducers/cartSlice";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/redux/hooks";
import { useSession } from "next-auth/react";
//===============================

interface IProductDetailPage {
  params: Promise<{ slug: string }>;
}

const DetailProductPage: React.FC<IProductDetailPage> = ({ params }) => {
  //====================================
  const { data: session, status } = useSession();
  //====================================
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);
  const [productData, setProductData] = useState<any>(null);

  //==========================
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { updateCart } = useCart();
  const router = useRouter();
  //===========================

  useEffect(() => {
    if (status !== "loading" && session) {
      getData();
    }
  }, [session, status]);

  const getData = async (): Promise<void> => {
    try {
      setLoading(true);
      const slug = (await params).slug;
      console.log("getting data");
      const response = await callAPI.get(`product/${slug}`, {
        headers: { Authorization: `Bearer ${session?.user.auth_token}` },
      });
      console.log(response);
      setProductData(response.data.result);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  console.log("product data", productData);

  const formatRupiah = (amount: any) => {
    return `Rp. ${amount.toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  //KURANG BIKIN SKELETON (PAKAI LOADING STATE)
  //==============================================
  const handleAddToCart: () => Promise<void> = async () => {
    if (isAdding) return;
    try {
      setIsAdding(true);
      await callAPI.post(
        "/cart",
        {
          product_id: productData?.product_id,
          quantity: quantity,
        },
        {
          headers: { Authorization: `Bearer ${session?.user.auth_token}` },
        },
      );
      await Promise.all([
        dispatch(fetchCartItems({ token: session?.user.auth_token! })).unwrap(),
        dispatch(fetchCartCount({ token: session?.user.auth_token! })).unwrap(),
      ]);
      updateCart("add_item");
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      alert("Something went wrong while adding the product to your cart.");
    } finally {
      setIsAdding(false);
    }
  };

  if (status === "loading" || !session) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !productData) {
    return <div>Error loading product details.</div>;
  }
  //===============================
  return (
    <div className="grid h-full w-full grid-cols-1 gap-5 p-7 lg:grid-cols-3 lg:px-20 lg:py-10">
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
        <h1 className="pb-4 text-lg font-bold lg:text-lg lg:font-semibold">
          {/* Available Stock : {productData.stock ? productData.stock : "0"} */}
          {/* aku ganti ini dulu */}
          Available Stock:{" "}
          {productData.stock && productData.stock.quantity
            ? productData.stock.quantity
            : "0"}
          {/* ============================= */}
        </h1>
        <div className="description text-sm lg:text-base">
          <p>{productData.product_description}</p>
        </div>
        <div className="flex gap-2 py-10 text-lg lg:py-8">
          <Badge>
            CATEGORY{" "}
            {productData.product_category?.product_category_name.toUpperCase()}
          </Badge>
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

export default DetailProductPage;
