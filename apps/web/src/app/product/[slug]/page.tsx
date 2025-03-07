"use client";
import { callAPI } from "@/config/axios";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { fetchCartItems, fetchCartCount } from "@/lib/redux/reducers/cartSlice";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/redux/hooks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface IProductDetailPage {
  params: Promise<{ slug: string }>;
}

const detailProductPage: React.FC<IProductDetailPage> = ({ params }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);
  const [productData, setProductData] = useState<any>([]);

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

  const getData = async (): Promise<void> => {
    try {
      setLoading(true);
      const slug = (await params).slug;
      console.log("getting data");
      const response = await callAPI.get(`/product/${slug}`);
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
    <div className="relative grid h-full min-h-screen w-full grid-cols-1 gap-4 py-24 lg:grid-cols-3">
      <div className="flex h-full w-full flex-col gap-4 lg:col-span-2 lg:py-10">
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
        ) : (
          <div className="aspect-square w-full rounded-xl bg-gray-300"></div>
        )}
        <div className="flex flex-col items-start justify-start gap-2 py-2 lg:py-5">
          <h1 className="text-3xl font-semibold">{productData.product_name}</h1>
          <p className="text-lg lg:text-lg lg:font-semibold">
            {formatRupiah(parseInt(productData.product_price))}
          </p>
        </div>
        <Accordion type="multiple" className="pb-5">
          <AccordionItem value="item-1">
            <AccordionTrigger>Description</AccordionTrigger>
            <AccordionContent>
              {productData.product_description}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Category</AccordionTrigger>
            <AccordionContent>
              {productData.product_category?.product_category_name}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Available Stock</AccordionTrigger>
            <AccordionContent>
              {productData.stock && productData.stock.quantity
                ? productData.stock.quantity
                : "0"}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="fixed bottom-0 h-fit w-full rounded-xl border-2 p-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex w-full justify-between">
            <p>Quantity :</p>
            <div className="flex gap-1">
              <Button
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  }
                }}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <p>{quantity}</p>
              <Button
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
              >
                +
              </Button>
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className={`w-full rounded bg-[#80ED99] px-4 py-2 text-black hover:bg-[#60cd79] ${
              isAdding ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={isAdding}
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default detailProductPage;
