"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { BorderTrail } from "@/components/core/border-trail";
import { cn } from "@/lib/utils";
import { TextEffect } from "@/components/core/text-effect";
import { TextShimmer } from "@/components/core/text-shimmer";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  const [textAn, setTextAn] = useState(true);
  return (
    <div className="text-red-800 flex justify-center items-center min-h-screen">
      <div className="flex flex-col gap-9 p-20">
        <div className="text-xl font-bold text-center border border-zinc-900 p-3 rounded-xl bg-red-950/20 shadow-md shadow-red-950/30">
          <TextEffect
            per="char"
            preset="fade"
            className="bg-gradient-to-r from-red-950/10 to-transparent"
            trigger={textAn}
          >
            {`Ooops you ${error.message.toString()} an error`}
          </TextEffect>
        </div>
        <div className="flex justify-center">
          <Button
            onClick={() => reset()}
            className="w-[10rem] p-5  hover:bg-blue-950/50 text-gray-200 hover:text-blue-100 shadow-lg shadow-blue-700/30 bg-blue-950/20 transition-all border border-gray-700"
          >
            <TextShimmer
              duration={1}
              className="text-xl font-medium [--base-color:theme(colors.white)] [--base-gradient-color:theme(colors.blue.200)] dark:[--base-color:theme(colors.zinc.500)] dark:[--base-gradient-color:theme(colors.blue.300)]"
            >
              Reset
            </TextShimmer>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error;
