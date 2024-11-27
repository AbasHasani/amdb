"use client";
import { cn, originalImgUrl } from "@/lib/utils";
import React, { FC, useEffect, useState } from "react";
import { BiSearch, BiLoader } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { Input } from "./ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { getSearchResults } from "@/lib/api/tmdb";
import Image from "next/image";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";

const SearchBar: FC<{
  classNames: string;
  setResults: (data: SearchResultType[]) => void;
  setOpen: (data: boolean) => void;
  open: boolean;
}> = ({ classNames, setResults, setOpen, open }) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const router = useRouter();
  const handleSearch = async () => {
    setLoading(true);
    //@ts-ignore
    const data = await getSearchResults(searchTerm);
    console.log(data);
    setResults(data.results.reverse());
    setLoading(false);
  };
  useEffect(() => {
    console.log("Searching for:", debouncedSearchTerm);
    // Perform your search here
    handleSearch();
  }, [debouncedSearchTerm]);
  return (
    <li
      className={cn(classNames, "flex items-center gap-2 px-2", {
        "w-fit hover:bg-none": open,
      })}
    >
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="w-full h-full flex leading-none items-center justify-center font-normal text-base"
        >
          <BiSearch className="w-7 h-7" size={"icon"} />
        </button>
      ) : loading ? (
        <button>
          <BiLoader className="w-9 h-9" />
        </button>
      ) : (
        <button
          onClick={() => {
            setOpen(false);
            setResults([]);
          }}
        >
          <IoMdClose className="w-9 h-9" />
        </button>
      )}
      {open ? (
        <div>
          <Input
            className="w-[20rem]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={(e) =>
              e.key === "Enter" ? router.push(`/search?q=${searchTerm}`) : null
            }
          />
        </div>
      ) : (
        ""
      )}
    </li>
  );
};

export default SearchBar;
