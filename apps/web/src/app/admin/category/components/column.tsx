/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type CategoryList = {
  product_category_id: number;
  product_category_name: string;
  deletedAt: any;
};

export const columns = (
  setAction: (action: string) => void,
  setCategoryId: (id: number) => void,
  setOpenDialog: (open: boolean) => void,
  isSuperAdmin: boolean,
): ColumnDef<CategoryList>[] => [
  {
    accessorKey: "product_category_name",
    header: ({ column }) => {
      return (
        <Button className="px-2" variant="ghost">
          Name
        </Button>
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
      const categoryList = row.original;

      const onHandleEdit = () => {
        setCategoryId(categoryList.product_category_id);
        setAction("Edit");
        setOpenDialog(true);
      };

      const onHandleDelete = () => {
        setCategoryId(categoryList.product_category_id);
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
              Edit Category
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={onHandleDelete}>
              Delete Category
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <></>
      );
    },
  },
];
