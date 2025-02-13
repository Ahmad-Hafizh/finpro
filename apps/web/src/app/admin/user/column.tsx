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

export type StoreAdmin = {
  admin_id: number;
  account_id: number;
  store_id: number;
  phone: string;
  position: string;
  account: {
    account_id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    isVerified: boolean;
  };
};

export const columns = (
  setAction: (action: string) => void,
  setAdminId: (id: number) => void,
  setOpenDialog: (open: boolean) => void
): ColumnDef<StoreAdmin>[] => [
  {
    accessorKey: "account.name",
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
    accessorKey: "store_id",
    header: ({ column }) => {
      return (
        <Button
          className="px-2"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Store Id
          <AiOutlineSortAscending />{" "}
        </Button>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          className="px-2"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone
          <AiOutlineSortAscending />{" "}
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const storeAdmin = row.original;

      const onHandleEdit = () => {
        console.log("SRTOREADMN,", storeAdmin);
        setAdminId(storeAdmin.admin_id);
        console.log("Ini store admin: ", storeAdmin.admin_id);
        setAction("Edit");
        setOpenDialog(true);
      };

      const onHandleDelete = () => {
        setAdminId(storeAdmin.admin_id);
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
