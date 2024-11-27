"use client";

import { originalImgUrl } from "@/lib/utils";
import Image from "next/image";
import { FC, useState } from "react";

import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Gallery: FC<Images & { isCast?: boolean }> = ({ backdrops, isCast }) => {
  const [isOpen, setIsOpen] = useState(false);
  if (!backdrops) return null;
  if (backdrops.length == 0) return null;
  return (
    <div className="p-10">
      <h2 className="heading_title text-center p-5">Images Gallery</h2>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="space-y-2"
      >
        <div className="grid sm:grid-cols-4 grid-cols-1 gap-4 mb-3">
          {backdrops?.map(
            (image, index) =>
              index < 4 && (
                <Image
                  key={index}
                  src={originalImgUrl + image.file_path}
                  width={100}
                  height={100}
                  unoptimized
                  priority
                  alt=""
                  className={`${
                    index != 0 ? "hidden sm:block" : "col-span-4 sm:col-span-1"
                  } w-full h-full object-cover rounded-md`}
                />
              )
          )}
        </div>
        {backdrops?.length < 5 ? null : (
          <CollapsibleTrigger asChild >
            <Button variant="outline" size="lg" className="p-0 px-10">
              <p>See other images</p>
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        )}
        <CollapsibleContent className="grid sm:grid-cols-4 grid-cols-1 gap-4 space-y-2">
          {backdrops?.map(
            (image, index) =>
              index != 0 && (
                <Image
                  key={index}
                  src={originalImgUrl + image.file_path}
                  width={100}
                  height={100}
                  unoptimized
                  priority
                  alt=""
                  className={`${
                    index < 4 ? "sm:hidden" : ""
                  } w-full h-full object-cover rounded-md`}
                />
              )
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Gallery;
