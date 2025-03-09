/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ColumnDef } from "@tanstack/react-table";

import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Store = {
  store_id: string | number;
  store_name: string;
  city: string;
  store_address: string;
};

export const columns = (session: any): ColumnDef<Store>[] => [
  {
    accessorKey: "store_name",
    header: "Name",
  },
  {
    accessorKey: "store_address",
    header: "Address",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    header: "actions",
    cell: ({ row }) => {
      if (session?.user.role == "user") {
        return (
          <Link href={`/admin/store/edit/${row.original.store_name}`}>
            Edit
          </Link>
        );
      } else {
        return "";
      }
    },
  },
];
