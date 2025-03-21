"use client";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const SearchBox = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial search keyword from URL
  const [searchValue, setSearchValue] = useState(
    searchParams.get("keywordNew") || "",
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchValue) {
      params.set("keywordNew", searchValue);
    } else {
      params.delete("keywordNew");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  }, [searchValue]);

  return (
    <Input
      type="text"
      placeholder="Search here..."
      className="h-full px-7"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
    />
  );
};

export default SearchBox;
