"use client";
import Image from "next/image";
import React, { FC, useEffect, useRef, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { originalImgUrl } from "@/lib/utils";
import CircularProgress from "./CircularProgressRing";
import Link from "next/link";

const SearchResultItem: FC<{ results: SearchResultType[] }> = ({ results }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(null);
  const [change, setChange] = useState("");
  useEffect(() => {
    //@ts-ignore
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [results]);
  if (!results.length) return null;

  return (
    <ScrollArea
      ref={containerRef}
      onClick={(e) => setChange((prev) => prev + "-")}
      className="!absolute z-50 bg-black/30 scroll-smooth text-white bottom-full left-0 !backdrop-blur-lg h-[40rem] w-full rounded-md mb-3"
    >
      {results.map((result) => (
        <Link
          href={`/${result.media_type != "person" ? "film" : "person"}/${
            result.id
          }`}
          className="flex bg-red-50/10"
          key={result.id}
        >
          <Image
            src={
              !result.poster_path && !result.profile_path
                ? "/assets/noimg_edited.PNG"
                : originalImgUrl + (result.poster_path || result.profile_path)
            }
            unoptimized
            width={300}
            height={500}
            alt=""
            className="w-[10rem] rounded-md m-2"
          />
          <div className="flex flex-col  gap-2 mt-5 text-lg">
            <p>{((result?.title || result?.name) ?? "").substring(0, 40)}</p>
            <CircularProgress
              size={40}
              isCast={result.media_type === "person" ? true : false}
              progress={
                result.media_type === "movie" || result.media_type === "tv"
                  ? result.vote_average
                  : Math.ceil(result.popularity) / 10
              }
            />
            <div className="text-gray-400 font-light text-sm">
              {result.overview?.substring(0, 100) || (
                <div>
                  <h2>Known for:</h2>
                  {result.known_for?.slice(0, 3).map((film: any) => (
                    <p key={film.id} className="pl-1">
                      - {film.title || film.name}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
      <div ref={scrollRef} />
    </ScrollArea>
  );
};

export default SearchResultItem;
