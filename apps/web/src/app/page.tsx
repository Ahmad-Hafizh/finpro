/* eslint-disable @typescript-eslint/no-explicit-any */
import { CategoryCarousel } from "@/components/global/CategoryCarousel";
import { LargeCarousel } from "@/components/global/LargeCarousel";
import { ProductCarousel } from "@/components/global/ProductCarousel";
import { callAPI } from "@/config/axios";
// import StorePick from "@/components/global/StorePick";
import Link from "next/link";

const Home = async () => {
  const getProducts = async () => {
    try {
      const response = await callAPI.get("/product/landing");
      return response.data.result;
    } catch (error) {
      console.log(error);
    }
  };
  const getBanner = async () => {
    try {
      const response = await callAPI.get("/voucher/banner");
      return response.data.result;
    } catch (error) {
      console.log(error);
    }
  };
  const getCategory = async () => {
    try {
      const response = await callAPI.get("/category");
      return response.data.result;
    } catch (error) {
      console.log(error);
    }
  };

  const banner: any[] = await getBanner();
  const products: any[] = await getProducts();
  const categories: any[] = await getCategory();

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
      {products.map((e: any, i: number) => (
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
