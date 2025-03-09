/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { FaSortAlphaDown } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const SortBox = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState<any>(searchParams.get("sortBy") || "");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (sortBy) {
      params.set("sort", sortBy);
    } else {
      params.delete("sort");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }, [sortBy, searchParams]);

  const handleSortChange = (value: string) => {
    setSortBy((prev: any) => (prev === value ? "" : value)); // Toggle the value
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-full" asChild>
        <Button variant="outline">
          <FaSortAlphaDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Sort</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={sortBy === "name-asc"}
          onCheckedChange={() => handleSortChange("name-asc")}
        >
          Name A-Z
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={sortBy === "name-desc"}
          onCheckedChange={() => handleSortChange("name-desc")}
        >
          Name Z-A
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={sortBy === "price-desc"}
          onCheckedChange={() => handleSortChange("price-desc")}
        >
          Price (High to Low)
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={sortBy === "price-asc"}
          onCheckedChange={() => handleSortChange("price-asc")}
        >
          Price (Low to High)
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortBox;
