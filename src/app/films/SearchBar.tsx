"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const handleSearch = () => {
    router.push(`/films/search?query=${searchValue}`);
    setSearchValue("");
  };
  return (
    <div className="flex">
      <Button
        className={`bg-gray-200 rounded-r-none data-[checked=true]:border-0 px-3 py-2 ${
          searchValue
            ? "bg-gray-700/50 border border-gray-600 text-zinc-200 hover:text-black"
            : ""
        }`}
        onClick={() => searchValue && handleSearch()}
      >
        Search
      </Button>
      <Input
        className="rounded-l-none bg-zinc-800/50 px-3 py-2 lg:min-w-[20rem] border-l-0"
        placeholder="you fought well..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyUp={(e) => e.code === "Enter" && handleSearch()}
      />
    </div>
  );
};

export default SearchBar;
