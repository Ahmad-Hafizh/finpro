"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const FilterBox = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categories = [
    "Dry vegetable",
    "Fruit",
    "Wet vegetable",
    "Green vegetable",
    "Nut",
  ];

  // Function to update URL based on selected filters
  const dynamicFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.get(key)?.split(",") || [];

    if (currentValues.includes(value)) {
      const updatedValues = currentValues.filter((item) => item !== value);
      if (updatedValues.length > 0) {
        params.set(key, updatedValues.join(","));
      } else {
        params.delete(key);
      }
    } else {
      currentValues.push(value);
      params.set(key, currentValues.join(","));
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Function to check if a filter value is selected
  const isChecked = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    return params.get(key)?.split(",").includes(value) || false;
  };

  return (
    <div className="filter-box rounded-lg shadow-sm border border-gray-200 h-full w-1/4 p-6 gap-3">
      <h2 className="font-bold text-lg">Filter</h2>
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-1">
              {categories.map((category) => (
                <div
                  key={category}
                  className="flex justify-between items-center py-2"
                >
                  <label
                    htmlFor={category}
                    className="text-sm font-medium leading-none w-full"
                  >
                    {category}
                  </label>
                  <Checkbox
                    id={category}
                    checked={isChecked("category", category)}
                    onCheckedChange={(checked) =>
                      dynamicFilter("category", category)
                    }
                  />
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FilterBox;