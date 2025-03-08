"use client";
import React, { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  return (
    <div className="relative flex h-full w-full items-center">
      <Search className="absolute left-2 h-4 w-4" />
      <Input
        className="py-1 pl-8"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <ArrowRight
        className="absolute right-2 h-4 w-4 cursor-pointer"
        onClick={() => router.push(`/explore?search=${search}`)}
      />
    </div>
  );
};

export default SearchBar;
