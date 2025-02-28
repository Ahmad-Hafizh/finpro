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

export type Product = {
  product_id: number;
  product_name: string;
  product_price: number;
  product_category_id: number;
  product_description: string | null;
  deletedAt: string | null;
  stock: Stock;
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
    accessorKey: "product_stock.quantity",
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
      return (
        <div className="text-md font-medium">{product.stock?.quantity}</div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const productList = row.original;

      console.log("ROW: ", row.original);

      const onHandleEdit = () => {
        setProductId(productList.product_id);
        console.log("productList.product_id", productList.product_id);
        setAction("Edit");
        setOpenDialog(true);
      };

      const onHandleDelete = () => {
        setProductId(productList.product_id);
        setAction("Delete");
        setOpenDialog(true);
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

            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
