"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Combobox from "./combobox";
import { movieGenres, tvGenres } from "@/lib/api/languages";
import { Button } from "./ui/button";
import { AnimatedTabs } from "./motion-ui/AnimatedBackground";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { set } from "react-hook-form";
import { DiscoverForm } from "./forms/discover";

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

const DiscoverSheet = ({
  // setData,
  // searchParams,
}: {
  // setData: (cb: any) => void;
  // searchParams: DiscoverParams;
}) => {
  // const [list, setList] = useState<string | null>("movie");
  // const [rating, setRating] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"outline"}
          className="px-3 py-2 bg-white text-black rounded-lg"
          // onClick={() => setOpen(true)}
        >
          Discover
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filter by anything you want</SheetTitle>
        </SheetHeader>
        <div className="mt-5 p-5 flex flex-col gap-3">
          {/* <pre>{JSON.stringify(searchParams, null, 2)}</pre> */}
          <DiscoverForm setOpen={setOpen} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DiscoverSheet;
