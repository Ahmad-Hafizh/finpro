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

interface Icategory {
  product_category_id?: number;
  product_category_name?: string;
  deletedAt?: any;
}

interface FilterBoxProps {
  categories?: Icategory[];
}

const FilterBox = ({ categories }: FilterBoxProps) => {
  const [category, setCategory] = useState<any>([]);
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

  return (
    <div className="filter-box h-full w-full gap-3 rounded-lg border border-none bg-white px-5 py-7">
      <h2 className="text-lg font-semibold">Filter</h2>
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

export default FilterBox;
