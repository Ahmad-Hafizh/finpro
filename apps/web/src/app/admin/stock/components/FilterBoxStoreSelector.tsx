/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Icategory {
  product_category_id?: number;
  product_category_name?: string;
  deletedAt?: any;
}

interface FilterBoxProps {
  categories?: Icategory[];
  allStore?: any;
  adminInfo?: any;
  setStoreId: (storeId: any) => void;
}

const dummyStores = [
  { store_id: 1, store_name: "Store 1" },
  { store_id: 2, store_name: "Store 2" },
  { store_id: 3, store_name: "Store 3" },
  { store_id: 4, store_name: "Store 4" },
  { store_id: 5, store_name: "Store 5" },
  { store_id: 6, store_name: "Store 6" },
  { store_id: 7, store_name: "Store 7" },
  { store_id: 8, store_name: "Store 8" },
  { store_id: 9, store_name: "Store 9" },
  { store_id: 10, store_name: "Store 10" },
];

const FilterBoxStoreSelector = ({
  categories,
  setStoreId,
  allStore,
  adminInfo,
}: FilterBoxProps) => {
  const [category, setCategory] = useState<any>([]);
  const [selectedStore, setSelectedStore] = useState<number | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setCategory(categories);
  }, [categories]);

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

  const isChecked = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    return params.get(key)?.split(",").includes(value) || false;
  };

  const handleStoreChange = (value: string) => {
    const storeId = parseInt(value);
    setSelectedStore(storeId);
    setStoreId(storeId);
  };

  return (
    <div className="filter-box h-full w-full gap-3 rounded-lg border border-gray-200 p-6 shadow-sm">
      {!adminInfo[0]?.store ? (
        <div>
          <h1 className="py-5 text-lg font-bold">Select a store :</h1>
          <Select
            onValueChange={handleStoreChange}
            value={selectedStore?.toString()}
          >
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select a store" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Store</SelectLabel>
                {allStore.map((store: any) => (
                  <SelectItem
                    key={store.store_id}
                    value={store.store_id.toString()}
                  >
                    {store.store_name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      ) : (
        <h1 className="pt-5 text-lg font-bold">
          Store : {adminInfo[0]?.store?.store_name}
        </h1>
      )}

      <h2 className="pb-2 pt-7 text-lg font-bold">Filter</h2>
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-bold">Category</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-1">
              {category ? (
                category?.map((category: any) => (
                  <div
                    key={category.product_category_id}
                    className="flex w-full items-center justify-between gap-36 py-2"
                  >
                    <label
                      htmlFor={category.product_category_id}
                      className="w-full text-sm font-medium leading-none"
                    >
                      {category.product_category_name}
                    </label>
                    <Checkbox
                      key={category.product_category_id}
                      id={category.product_category_name.toString()}
                      checked={isChecked(
                        "cat",
                        category.product_category_name.toString(),
                      )}
                      onCheckedChange={(checked) =>
                        dynamicFilter(
                          "cat",
                          category.product_category_name.toString(),
                        )
                      }
                    />
                  </div>
                ))
              ) : (
                <div
                  key={category}
                  className="flex items-center justify-between py-2"
                >
                  <label
                    htmlFor={category}
                    className="w-full text-sm font-medium leading-none"
                  >
                    {category}
                  </label>
                  <Checkbox
                    id={category}
                    checked={isChecked("cat", category)}
                    onCheckedChange={(checked) =>
                      dynamicFilter("cat", category)
                    }
                  />
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FilterBoxStoreSelector;
