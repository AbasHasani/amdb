import Image from "next/image";
import React, { useCallback } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FadingBackgroundImage = ({ src,  }: { src: string }) => {
  
  return (
    <div className="absolute w-full h-full top-0 left-0 right-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black from-20% to-transparent"></div>
      <Image
        src={src}
        alt="backdrop_path"
        width={100}
        height={100}
        unoptimized
        className="w-full h-full object-cover sm:rounded-t-md"
      />
    </div>
  );
};

export default FadingBackgroundImage;
