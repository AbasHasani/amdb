import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
const FilmsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {Array(20)
        .fill(null)
        .map((_, i) => (
          <div key={i}>
            <Skeleton className="lg:w-[20rem] w-[14rem] h-[25rem] rounded-xl bg-gray-800" />
            <Skeleton className="mt-2 lg:w-[20rem] w-[14rem] h-[1rem] bg-gray-800" />
            <Skeleton className="mt-2 lg:w-[17rem] w-[12rem] h-[1rem] bg-gray-800" />
          </div>
        ))}
    </div>
  );
};

export default FilmsSkeleton;
