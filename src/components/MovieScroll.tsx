"use client";

import { movieGenres, tvGenres } from "@/lib/api/languages";
import Image from "next/image";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import { Button } from "./ui/button";

const MovieScroll: FC<{ currentIndex: number; data: any }> = ({
  currentIndex,
  data,
}) => {
  const childRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  useEffect(() => {
    api?.scrollTo(currentIndex);
    
  }, [currentIndex]);
  return (
    <Carousel
      setApi={setApi}
      opts={{loop:true}}
      orientation="vertical"
      className="absolute top-0 right-0 2xl:-right-3 lg:-right-10 hidden xl:block !p-0 !m-0"
    >
      <h2 className="text-center p-2">Up Next</h2>
      <CarouselContent className="w-[17rem] h-[35rem] text-green-100">
        {data.map((item: any, index: any) => {
          const genres = item.media_type == "movie" ? movieGenres : tvGenres;
          return (
            <CarouselItem className="basis-1/3" key={item.id}>
              <div
                className={`flex `}
                key={item.id + "scroll"}
              >
                <Image
                  src={"https://image.tmdb.org/t/p/original" + item.poster_path}
                  width={100}
                  height={100}
                  className="h-full min-w-[7rem] rounded-md object-cover"
                  unoptimized
                  alt=""
                />
                <div>
                  <p className="p-3">{item.title || item.name}</p>
                  {/* <p className="pl-3">{parseInt(item.vote_average.toString())}</p> */}
                  <div className="flex flex-col text-gray-400 text-sm font-light px-3">
                    {genres.map(
                      (genre) =>
                        item.genre_ids.includes(genre.value) && (
                          <span key={genre.value}>{genre.label}</span>
                        )
                    )}
                  </div>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};

export default MovieScroll;
