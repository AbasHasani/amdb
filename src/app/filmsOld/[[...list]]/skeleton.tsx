import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
const FilmsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {Array(20)
        .fill(null)
        .map((_, i) => (
          <div key={i}>
            <Skeleton
              className="w-[20rem] h-[25rem] rounded-xl bg-gray-800"
            />
            <Skeleton
              className="mt-2 w-[20rem] h-[1rem] bg-gray-800"
            />
            <Skeleton
              className="mt-2 w-[17rem] h-[1rem] bg-gray-800"
            />
          </div>
        ))}
    </div>
  );
};

export default FilmsSkeleton;
