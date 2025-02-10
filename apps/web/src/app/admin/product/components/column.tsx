"use client";

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
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";

export type ProductList = {
  id: number;
  images: string[];
  name: string;
  price: string;
  category: string;
};

export const columns = (
  setAction: (action: string) => void,
  setProductId: (id: number) => void,
  setOpenDialog: (open: boolean) => void
): ColumnDef<ProductList>[] => [
  {
    accessorKey: "images",
    header: ({ column }) => {
      return (
        <Button className="px-2" variant="ghost">
          Image
          <AiOutlineSortAscending />{" "}
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          className="px-2"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <AiOutlineSortAscending />{" "}
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          className="px-2"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <AiOutlineSortAscending />{" "}
        </Button>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          className="px-2"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <AiOutlineSortAscending />{" "}
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const productList = row.original;

      const onHandleEdit = () => {
        setProductId(productList.id);
        setAction("Edit");
        setOpenDialog(true);
      };

      const onHandleDelete = () => {
        setProductId(productList.id);
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
              Edit Admin
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={onHandleDelete}>
              Delete Admin
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
