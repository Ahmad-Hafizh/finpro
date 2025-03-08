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
  setOpenDialog: (open: boolean) => void,
): ColumnDef<any>[] => [
  {
    accessorKey: "user.name",
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
    accessorKey: "store.store_name",
    header: ({ column }) => {
      return (
        <Button
          className="px-2"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Store
          <AiOutlineSortAscending />{" "}
        </Button>
      );
    },
  },
  {
    accessorKey: "user.email",
    header: ({ column }) => {
      return (
        <Button
          className="px-2"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <AiOutlineSortAscending />{" "}
        </Button>
      );
    },
  },
  {
    accessorKey: "deleted_at",
    header: ({ column }) => {
      return (
        <Button
          className="px-2"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <AiOutlineSortAscending />{" "}
        </Button>
      );
    },
    cell: ({ row }) => {
      const admin = row.original;
      console.log("ini admin :", admin);
      if (admin.deleted_at !== null) {
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
      const storeAdmin = row.original;

      const onHandleEdit = () => {
        setAdminId(storeAdmin.admin_id);
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
