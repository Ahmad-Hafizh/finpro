"use client";
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("keyword") || "");

  useEffect(() => {
    if (pathName.startsWith("/explore")) {
      const params = new URLSearchParams(searchParams.toString());
      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }
      router.push(`?${params.toString()}⁠, { scroll: false }`);
    }
  }, [search, pathName, searchParams]);

  return (
    <div className="relative flex w-full items-center">
      <Input
        className="py-1 pl-2 pr-8"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <Search
        className="absolute right-3 h-4 w-4 cursor-pointer"
        onClick={() => router.push(`/explore?search=${search}`)}
      />
    </div>
  );
};

export default SearchBar;
