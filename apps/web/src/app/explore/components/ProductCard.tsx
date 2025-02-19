import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface IProductProps {
  product_name: string;
  product_price: any;
}

const ProductCardExplore: React.FC<IProductProps> = ({
  product_name,
  product_price,
}: IProductProps) => {
  return (
    <div
      className={`relative z-[9999] flex h-fit max-h-[400px] w-full cursor-pointer flex-col justify-between rounded-lg border-none bg-white shadow-lg hover:bg-gray-100`}
    >
      <img
        src={`https://searchengineland.com/wp-content/seloads/2015/12/google-amp-fast-speed-travel-ss-1920.jpg`}
        className="h-36 w-full rounded-tl-lg rounded-tr-lg object-cover md:h-40 lg:h-48"
      />
      <div className="flex flex-col px-5 py-3 md:py-4 lg:py-5">
        <h1 className="text-md line-clamp-2 font-extrabold md:text-lg">
          {product_name}
        </h1>
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-sm">
            <span className="font-bold">{product_price}</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ProductCardExplore;
