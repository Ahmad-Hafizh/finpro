import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { AiOutlineSortAscending } from "react-icons/ai";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { callAPI } from "@/config/axios";
import { useToast } from "@/hooks/use-toast";

export type Product = {
  product_id: number;
  product_name: string;
  product_price: number;
  product_category_id: number;
  product_description: string | null;
  deletedAt: string | null;
  stock: Stock[];
  product_img: any[];
  product_category: ProductCategory;
  voucher: any[];
};

export type Stock = {
  stock_id: number;
  store_id: number;
  product_id: number;
  quantity: number;
};

export type ProductCategory = {
  product_category_id: number;
  product_category_name: string;
  deletedAt: string | null;
};

export const columns = (
  setAction: (action: string) => void,
  setProductId: (id: number) => void,
  setOpenDialog: (open: boolean) => void,
  storeId: number,
): ColumnDef<Product>[] => [
  {
    accessorKey: "product_name",
    header: ({ column }) => {
      return (
        <Button
          className="text-md px-2 font-semibold text-black"
          variant="ghost"
        >
          Name
        </Button>
      );
    },
    cell: ({ row }) => {
      const product = row.original;
      return <div className="text-md font-medium">{product.product_name}</div>;
    },
  },
  {
    accessorKey: "product_price",
    header: ({ column }) => {
      return (
        <Button
          className="text-md px-2 font-semibold text-black"
          variant="ghost"
        >
          Price
        </Button>
      );
    },
    cell: ({ row }) => {
      const product = row.original;
      return <div className="text-md font-medium">{product.product_price}</div>;
    },
  },
  {
    accessorKey: "product_category.product_category_name",
    header: ({ column }) => {
      return (
        <Button
          className="text-md px-2 font-semibold text-black"
          variant="ghost"
        >
          Category
        </Button>
      );
    },
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="text-md font-medium">
          {product.product_category?.product_category_name}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          className="text-md px-2 font-semibold text-black"
          variant="ghost"
        >
          Status
        </Button>
      );
    },
    cell: ({ row }) => {
      const statusList = row.original;
      if (statusList.deletedAt !== null) {
        return (
          <div className="m-2 flex h-fit w-fit items-center justify-center rounded-2xl bg-red-500 px-1">
            <h1 className="p-2 font-bold text-white">DELETED</h1>
          </div>
        );
      } else {
        return (
          <div className="m-2 flex h-fit w-fit items-center justify-center rounded-2xl bg-green-500 px-1">
            <h1 className="p-2 font-bold text-white">ACTIVE</h1>
          </div>
        );
      }
    },
  },
  {
    accessorKey: "stock.quantity",
    header: ({ column }) => {
      return (
        <Button
          className="text-md px-2 font-semibold text-black"
          variant="ghost"
        >
          Stock Available
        </Button>
      );
    },
    cell: ({ row }) => {
      const product = row.original;
      console.log("PRODUCT: ", product);
      const stockForStore = product.stock?.find((s) => s.store_id === storeId);
      return (
        <div className="text-md font-medium">{product.stock[0].quantity}</div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { toast } = useToast();
      const productList = row.original;

      console.log("ROW: ", row.original);

      const onHandleEdit = () => {
        setProductId(productList.product_id);
        console.log("productList.product_id", productList.product_id);
        setAction("Edit");
        setOpenDialog(true);
      };

      const onHandleDelete = async () => {
        try {
          if (
            productList.stock.find((s) => s.store_id === storeId)?.quantity ===
            0
          ) {
            toast({
              title: "Error",
              description: "Stock is already empty",
              variant: "destructive",
            });
          } else {
            const payload = {
              product_id: productList.product_id,
              store_id: storeId,
            };
            const response = await callAPI.patch("/stock/zero", payload);

            if (response.status === 200) {
              toast({
                title: "Success",
                description: "Emptying Stock Success",
                className: "bg-gradient-to-r from-green-300 to-green-200",
              });
              setTimeout(() => {
                window.location.reload();
              }, 500);
            } else {
              toast({
                title: "Error",
                description: "Something went wrong while emptying stock",
                variant: "destructive",
              });
            }

            setProductId(productList.product_id);
            // setAction("Delete");
            // setOpenDialog(true);
          }
        } catch (error) {
          console.log(error);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem onClick={onHandleEdit}>
              Edit Stock
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onHandleDelete}>
              Empty Stock
            </DropdownMenuItem>

            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
