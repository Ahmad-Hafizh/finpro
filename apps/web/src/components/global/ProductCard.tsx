"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface IProductCard {
  product_name: string;
  product_price: number;
  product_image?: { image_url: string };
}

const ProductCard: React.FC<IProductCard> = ({
  product_name,
  product_price,
  product_image,
}) => {
  return (
    <div className="flex h-[300px] flex-col items-center justify-start gap-2 rounded-xl border px-2 pb-4 pt-2">
      <div className="relative h-2/3 w-full overflow-hidden rounded-lg">
        {product_image ? (
          <Image
            src={product_image.image_url}
            fill
            alt="product image"
            sizes="300"
            className="absolute object-cover"
          />
        ) : (
          <p>loading...</p>
        )}
      </div>
      <div className="flex h-1/3 w-full flex-col justify-between px-1">
        <div>
          <p className="text-md font-medium leading-tight">{product_name}</p>
          <p className="text-sm text-gray-400">100 ml</p>
        </div>
        <div className="flex items-end justify-between">
          <p className="text-sm">
            {product_price
              ?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })
              .replace(",00", "")}
          </p>
          <Button className="h-8 w-4 rounded-full bg-green-400 text-xl">
            <Plus className="text-xl" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
