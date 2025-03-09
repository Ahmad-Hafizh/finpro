"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../../ui/input";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

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
