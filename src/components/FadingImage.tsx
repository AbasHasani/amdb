import Image from "next/image";
import React, { useCallback } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FadingImage = ({ src,  }: { src: string }) => {
  
  return (
    <div className="absolute lg:w-[96%] w-full h-full top-0 left-0 right-0 overflow-hidden z-50">
      <div className="absolute inset-0 fade-gradient"></div>
      <Image
        src={src}
        alt="backdrop_path"
        width={100}
        height={100}
        unoptimized
        className="xl:mx-auto xl:w-[69%] w-full h-4/5 object-cover bg-slate-200 sm:rounded-t-md"
      />
    </div>
  );
};

export default FadingImage;
