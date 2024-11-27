import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="container">
      <div className="p-5 flex flex-col lg:flex-row gap-3 justify-center lg:justify-start lg:items-start items-center">
        <Skeleton className="w-[20rem] h-[24rem]" />
        <div className="flex flex-col w-[20rem] gap-3 lg:mt-5 lg:ml-5">
          <Skeleton className="w-[10rem] h-[2rem]" />
          <Skeleton className="w-[5rem] h-[5rem] rounded-full" />
          <div className="hidden lg:flex gap-3 my-5">
            <Skeleton className="w-[20rem] h-[2rem]" />
            <Skeleton className="w-[20rem] h-[2rem]" />
            <Skeleton className="w-[20rem] h-[2rem]" />
          </div>
          <div className="gap-3 flex flex-col">
            <Skeleton className="w-[20rem] h-[2rem]" />
            <Skeleton className="w-[20rem] h-[2rem]" />
            <Skeleton className="w-[20rem] h-[2rem]" />
          </div>
        </div>
      </div>
      <div className="flex gap-3 p-5">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <Skeleton key={i} className="w-[22rem] h-[26rem]" />
          ))}
      </div>
    </div>
  );
};

export default loading;
