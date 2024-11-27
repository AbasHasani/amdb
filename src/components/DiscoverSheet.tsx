"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";

import { DiscoverForm } from "./forms/discover";
import { useParams, useSearchParams } from "next/navigation";

const languages = [
  { value: "en-US", label: "English" },
  { value: "es-ES", label: "Spanish" },
  { value: "zh-CN", label: "Chinese" },
  { value: "zh-FA", label: "Persian" },
  { value: "hi-IN", label: "Hindi" },
  { value: "ar-SA", label: "Arabic" },
  { value: "fr-FR", label: "French" },
  { value: "de-DE", label: "German" },
  { value: "ja-JP", label: "Japanese" },
  { value: "pt-BR", label: "Portuguese" },
];

const DiscoverSheet = () => {
  const searchParams = useSearchParams();
  const type: any = useParams().list;

  let params = Object.fromEntries(searchParams.entries());
  if (type.length > 1) params = { ...params, type: type[1] };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"outline"}
          className="px-3 py-2 bg-white text-black rounded-lg"
        >
          Discover
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filter by anything you want</SheetTitle>
        </SheetHeader>
        <div className="mt-5 lg:p-5 flex flex-col gap-3">
          {/* @ts-ignore */}
          <DiscoverForm searchParams={params} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DiscoverSheet;
