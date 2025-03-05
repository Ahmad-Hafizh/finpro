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

  const products = await getProducts();

  return (
    <div className="flex flex-col gap-6 py-24">
      {/* <StorePick /> */}
      <div className="overflow-hidden rounded-xl md:px-0">
        <LargeCarousel />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-lg md:text-xl">Categories</p>
        <CategoryCarousel />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex w-full justify-between">
          <p className="text-lg md:text-xl">Todays choice</p>
          <Link href="/search">see all</Link>
        </div>
        <ProductCarousel products={products.recommend} />
      </div>
      {products.category_product.map((e) => (
        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between">
            <p className="text-lg md:text-xl">{e.product_category_name}</p>
            <Link href="/search">see all</Link>
          </div>
          <ProductCarousel products={e.product} />
        </div>
      ))}
    </div>
  );
};
export default Home;
