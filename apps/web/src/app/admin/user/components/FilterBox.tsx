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

interface FilterBoxProps {
  allStore?: any;
}

const FilterBox = ({ allStore }: FilterBoxProps) => {
  const [selectedStore, setSelectedStore] = useState<number | null>(null);
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
    <div className="filter-box h-full w-1/4 gap-3 rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-bold">Filter</h2>
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-1">
              {allStore.map((store: any) => (
                <div
                  key={store.store_id}
                  className="flex items-center justify-between py-2"
                >
                  <label
                    htmlFor={`store-${store.store_id}`}
                    className="w-full text-sm font-medium leading-none"
                  >
                    {store.store_name}
                  </label>
                  <Checkbox
                    id={`store-${store.store_id}`}
                    checked={isChecked("store", store.store_id.toString())}
                    onCheckedChange={() =>
                      dynamicFilter("store", store.store_id.toString())
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
