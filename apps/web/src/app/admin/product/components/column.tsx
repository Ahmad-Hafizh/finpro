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

export type ProductList = {
  product_id: number;
  product_img: string[];
  product_name: string;
  product_price: string;
  product_category: {
    product_category_id: string;
    product_category_name: string;
  };
  deletedAt: Date | null;
};

export const columns = (
  setAction: (action: string) => void,
  setProductId: (id: number) => void,
  setOpenDialog: (open: boolean) => void,
  isSuperAdmin: boolean,
): ColumnDef<ProductList>[] => [
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
          {product.product_category.product_category_name}
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
    id: "actions",
    cell: ({ row }) => {
      const productList = row.original;

      const onHandleEdit = () => {
        console.log("INI PRODUCT LIST : PRODUCT ID : ", productList.product_id);
        setProductId(productList.product_id);
        setAction("Edit");
        setOpenDialog(true);
      };

      const onHandleDelete = () => {
        setProductId(productList.product_id);
        setAction("Delete");
        setOpenDialog(true);
      };

      return isSuperAdmin ? (
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
              Edit Product
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={onHandleDelete}>
              Delete Product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <></>
      );
    },
  },
];
