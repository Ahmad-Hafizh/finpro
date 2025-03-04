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

const SortBoxTotal = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState<any>(searchParams.get("month") || "");

  const generateLast12Months = () => {
    const months = [{ displayText: "All Months", value: "" }];
    const currentDate = new Date();

    for (let i = 0; i < 13; i++) {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() - i);

      const displayText = date.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });
      const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

      months.push({ displayText, value });
    }

    return months;
  };

  const last12Months = generateLast12Months();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (sortBy) {
      params.set("month", sortBy);
    } else {
      params.delete("month");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }, [sortBy, searchParams]);

  const handleSortChange = (value: string) => {
    setSortBy((prev: any) => (prev === value ? "" : value));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-fit" asChild>
        <Button variant="outline">
          <FaSortAlphaDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Sort</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {last12Months.map(({ displayText, value }) => (
          <DropdownMenuCheckboxItem
            key={value}
            checked={sortBy === value}
            onCheckedChange={() => handleSortChange(value)}
          >
            {displayText}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortBoxTotal;
