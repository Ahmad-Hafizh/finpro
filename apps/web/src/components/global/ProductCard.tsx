import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface IProductCard {
  product_name: string;
  product_price: number;
  product_id: number;
}

const ProductCard: React.FC<IProductCard> = ({
  product_name,
  product_id,
  product_price,
}) => {
  return (
    <div className="flex h-[300px] flex-col items-center justify-start rounded-xl border border-gray-400 px-4 pb-6 pt-4">
      <div className="h-2/3 w-full"></div>
      <div className="flex h-1/3 w-full flex-col justify-between">
        <div>
          <p className="text-lg font-semibold">{product_name}</p>
          <p className="text-gray-400">100 ml</p>
        </div>
        <div className="flex items-end justify-between">
          <p className="text-lg">
            {product_price.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </p>
          <Button className="h-8 w-4 rounded-full text-xl">
            <Plus className="text-xl" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
