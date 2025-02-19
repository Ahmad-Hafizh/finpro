"use client";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchBox = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("keyword") || "",
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }, [searchValue, searchParams]);

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Search here..."
        className="h-full w-full border border-none bg-white p-3 shadow-sm lg:text-xl"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
