import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const FilterBox = () => {
  const router = useRouter();
  const params = useSearchParams();

  const dynamicFilter = (key: string, value: string, condition?: string) => {
    const searchParams = new URLSearchParams(params.toString());
    const valueUpdate = searchParams.get(key);
    if (valueUpdate) {
      const newValuesUpdate = valueUpdate.split(",");
      if (!newValuesUpdate.includes(value)) {
        newValuesUpdate.push(value);
        searchParams.set(key, newValuesUpdate.join(","));
      }
    } else {
      searchParams.set(key, value);
    }
    router.push(`?${searchParams.toString()}`);
  };

  const store = ["Store 1", "Store 2", "Store 3", "Store 4", "Store 5"];
  return (
    <div className="filter-box rounded-lg shadow-sm border border-gray-200 h-full w-1/4 p-6 gap-3">
      <h2 className="font-bold text-lg">Filter</h2>
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Store</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-1 ">
              {store.map((store) => (
                <div
                  key={store}
                  className="flex justify-between items-center py-2"
                >
                  <label
                    htmlFor={store}
                    className="text-sm font-medium leading-none h-full w-full"
                  >
                    {store}
                  </label>
                  <Checkbox />
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
