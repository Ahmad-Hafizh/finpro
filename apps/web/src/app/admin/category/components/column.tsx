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

export type CategoryList = {
  id:number;
  name: string;
};

export const columns = (
  setAction: (action: string) => void,
  setCategoryId: (id: number) => void,
  setOpenDialog: (open: boolean) => void
): ColumnDef<CategoryList>[] => [
  
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
    id: "actions",
    cell: ({ row }) => {
      const categoryList = row.original;

      const onHandleEdit = () => {
        setCategoryId(categoryList.id);
        setAction("Edit");
        setOpenDialog(true);
      };

      const onHandleDelete = () => {
        setCategoryId(categoryList.id);
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
              Edit Category
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={onHandleDelete}>
              Delete Category
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
