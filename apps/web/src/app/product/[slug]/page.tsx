/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { callAPI } from "@/config/axios";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

//===========================
import { fetchCartItems, fetchCartCount } from "@/lib/redux/reducers/cartSlice";
import { useCart } from "@/contexts/CartContext";
// import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/redux/hooks";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
//===============================

interface IProductDetailPage {
  params: Promise<{ slug: string }>;
}

const DetailProductPage: React.FC<IProductDetailPage> = ({ params }) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);
  const [productData, setProductData] = useState<any>([]);
  const [stock, setStock] = useState<any>([]);

  //==========================
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { updateCart } = useCart();
  const { toast } = useToast();
  // const router = useRouter();

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
      setLoading(false);
    }
  };

  const getStore = async (id: any) => {
    try {
      const payload = { store_id: id };
      const response = await callAPI.post("/store/get-id", payload);
      console.log("RESPONSE DATA : ", response.data.result);
      return response.data.result.store_name;
    } catch (error) {
      console.log(error);
    }
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
    return `Rp. ${amount.toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const handleAddToCart = async (): Promise<void> => {
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
        dispatch(
          fetchCartItems({ token: session?.user.auth_token || "" }),
        ).unwrap(),
        dispatch(
          fetchCartCount({ token: session?.user.auth_token || "" }),
        ).unwrap(),
      ]);
      updateCart("add_item");
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "";
      if (errorMessage.includes("Insufficient product stock")) {
        toast({
          title: "Error",
          description: "Insufficient stock available.",
        });
      } else {
        toast({
          title: "Error",
          description:
            "Something went wrong while adding the product to your cart.",
        });
      }
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
    <div className="relative grid h-full min-h-screen w-full grid-cols-1 gap-4 py-24 lg:grid-cols-3">
      <div className="flex h-full w-full flex-col gap-4 lg:col-span-2 lg:py-10">
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
      <div className="sticky left-20 right-0 top-32 h-fit w-fit rounded-xl border-2 p-4">
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

export default DetailProductPage;
