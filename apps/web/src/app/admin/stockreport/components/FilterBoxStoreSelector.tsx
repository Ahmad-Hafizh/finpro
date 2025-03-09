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
  storeId: any;
  setStoreId: (storeId: any) => void;
}

const FilterBoxStoreSelector = ({
  categories,
  setStoreId,
  allStore,
  storeId,
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
    if (value === "all") {
      setSelectedStore(null);
      setStoreId(null);

      const params = new URLSearchParams(searchParams.toString());
      params.delete("store"); // Remove store filter
      router.push(`?${params.toString()}`, { scroll: false });
      return;
    }

    const storeId = parseInt(value);
    setSelectedStore(storeId);
    setStoreId(storeId);

    const params = new URLSearchParams(searchParams.toString());
    if (storeId) {
      params.set("store", storeId.toString());
    } else {
      params.delete("store");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="filter-box h-full w-fit gap-3 rounded-lg border border-gray-200 p-6 shadow-sm">
      {storeId ? (
        <h1 className="py-5 text-lg font-bold">Store: {storeId}</h1>
      ) : (
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
              <SelectItem value="all">All Store</SelectItem>
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
                    className="flex items-center justify-between py-2"
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
