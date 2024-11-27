"use client";
import { Bookmark, GripHorizontal, Heart, List, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";
export default function MovieOrTv({
  label,
  id,
  items,
}: {
  label: string;
  id: string;
  items: { id: string; label: string }[] | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        asChild
        className="bg-transparent"
        onClick={(e) => {
          e.stopPropagation(); // Prevents the click event from propagating to the <a> element
          e.preventDefault(); // Optional: Prevent default behavior of the <a> tag
          setIsOpen((prev) => !prev);
          console.log("Button clicked!");
        }}
      >
        <Button
          className={`relative flex shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg text-white transition-colors hover:bg-gray-500/20 focus-visible:ring-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 outline-none !py-0 !px-2`}
        >
          {!label ? items && items[index].label : label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuGroup>
          {items
            ? items.map(({ label, id }, i) => (
                <DropdownMenuItem key={id}>
                  <Link
                    href={id}
                    className="flex items-center gap-2 w-full h-full"
                    onClick={(e) => {
                      // e.preventDefault();
                      setIndex(i);
                      setIsOpen(false);
                    }}
                    prefetch={false}
                  >
                    <Heart />
                    <span>{label}</span>
                  </Link>
                </DropdownMenuItem>
              ))
            : null}{" "}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
