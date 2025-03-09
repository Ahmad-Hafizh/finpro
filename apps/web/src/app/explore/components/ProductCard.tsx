/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface IProductProps {
  product_name: string;
  product_price: any;
  product_image: any;
  product_category: any;
}

const formatRupiah = (amount: any) => {
  return `Rp. ${amount.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const ProductCardExplore: React.FC<IProductProps> = ({
  product_name,
  product_price,
  product_image,
  product_category,
}: IProductProps) => {
  const route = useRouter();
  return (
    <div
      className={`relative z-[9999] flex h-fit max-h-[400px] w-full cursor-pointer flex-col justify-between rounded-lg border-none bg-white shadow-lg hover:bg-gray-100`}
      onClick={() => route.push(`/product/${product_name}`)}
    >
      <img
        src={`${product_image}`}
        className="aspect-[4/3] h-48 w-full rounded-t-lg object-cover"
      />
      <div className="flex flex-grow flex-col px-5 py-3">
        <div className="flex justify-between">
          <h1 className="text-md line-clamp-2 font-extrabold md:text-lg">
            {product_name}
          </h1>
          {/* <Badge className="text-xs md:text-lg">
            <h1 className="text-xs">{product_category}</h1>
          </Badge> */}
        </div>

        <div className="flex items-center justify-between gap-3">
          <h1 className="text-sm">
            <span className="font-bold">{formatRupiah(product_price)}</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ProductCardExplore;
