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

export const columns = (
  setAction: (action: string) => void,
  setVoucherId: (id: number) => void,
  setOpenDialog: (open: boolean) => void,
): ColumnDef<any>[] => [
  {
    accessorKey: "voucher_code",
    header: ({ column }) => {
      return (
        <Button
          className="text-md px-2 font-semibold text-black"
          variant="ghost"
        >
          Voucher Code
        </Button>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          className="text-md px-2 font-semibold text-black"
          variant="ghost"
        >
          Type
        </Button>
      );
    },
  },
  {
    accessorKey: "storeOrProduct",
    header: ({ column }) => {
      return (
        <Button
          className="text-md px-2 font-semibold text-black"
          variant="ghost"
        >
          Store or Product
        </Button>
      );
    },
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => {
      return (
        <Button
          className="text-md px-2 font-semibold text-black"
          variant="ghost"
        >
          Start date
        </Button>
      );
    },
  },
  {
    accessorKey: "end_date",
    header: ({ column }) => {
      return (
        <Button
          className="text-md px-2 font-semibold text-black"
          variant="ghost"
        >
          End date
        </Button>
      );
    },
  },
  {
    accessorKey: "discount_percentage",
    header: ({ column }) => {
      return (
        <Button
          className="text-md px-2 font-semibold text-black"
          variant="ghost"
        >
          Discount Percentage
        </Button>
      );
    },
  },
  {
    accessorKey: "discount_nominal",
    header: ({ column }) => {
      return (
        <Button
          className="text-md px-2 font-semibold text-black"
          variant="ghost"
        >
          Dsicount Nominal
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const productList = row.original;

      const onHandleEdit = () => {
        setVoucherId(productList.product_id);
        setAction("Edit");
        setOpenDialog(true);
      };

      const onHandleDelete = () => {
        setVoucherId(productList.product_id);
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
              Edit Voucher
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={onHandleDelete}>
              Delete Voucher
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
