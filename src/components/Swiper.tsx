"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import { type CarouselApi } from "@/components/ui/carousel";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import FadingImage from "./FadingImage";
import MovieScroll from "./MovieScroll";
import Link from "next/link";
import CircularProgress from "./CircularProgressRing";
import { truncateAfterSpace } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { movieGenres, tvGenres } from "@/lib/api/languages";

const Swiper: FC<MovieListType> = ({ data }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollPrev = useCallback(() => {
    if (api) api.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    if (api) api.scrollNext();
  }, [api]);

  useEffect(() => {
    if (!api) return () => {};
    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };
    api.on("select", onSelect);
    onSelect();
  }, [api]);

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 8000,
          playOnInit: true,
        }),
      ]}
      className="w-full relative"
      setApi={setApi}
      opts={{
        loop: true,
      }}
    >
      <div className="absolute lg:w-[96%] w-full h-full top-0 left-0 right-0 overflow-hidden">
        <div className="absolute inset-0  xl:mx-auto xl:w-[69%] w-full h-4/5 object-cover sm:rounded-t-md">
          <Button
            className="opacity-20 hover:opacity-100 hidden lg:flex absolute top-[40%] z-20 right-0 rounded-lg w-[4rem] h-[4rem] backdrop-blur-lg bg-black/20 text-white text-xl border border-white hover:bg-gray-600/20 transition-colors justify-center items-center [&_svg]:size-9"
            onClick={() => scrollNext()}
          >
            <ChevronRight size={25} />
          </Button>
          <Button
            className="opacity-20 hover:opacity-100 hidden lg:flex absolute top-[40%] left-0 z-20  rounded-lg w-[4rem] h-[4rem] backdrop-blur-lg bg-black/20 text-white text-xl border border-white hover:bg-gray-600/20 transition-colors justify-center items-center [&_svg]:size-9"
            onClick={() => scrollPrev()}
          >
            <ChevronLeft size={25} />
          </Button>
        </div>
      </div>
      <CarouselContent className="w-full md:h-[40rem] sm:h-[30rem] h-[20rem] !p-0 !m-0">
        {data.map((item) => {
          const genres: any =
            item.media_type == "movie" ? movieGenres : tvGenres;
          return (
            <CarouselItem
              key={item.id}
              className="w-full basis-full relative overflow-hidden h-full"
            >
              <FadingImage
                src={"https://image.tmdb.org/t/p/original" + item.backdrop_path}
              />
              <div className="absolute z-50 bottom-0 left-6 sm:left-16 rounded-md w-full h-[22rem] flex items-end sm:items-center">
                <Image
                  src={"https://image.tmdb.org/t/p/original" + item.poster_path}
                  width={100}
                  height={100}
                  className="lg:h-full lg:w-[16rem] w-[8em] h-3/5 rounded-md object-cover sm:block"
                  unoptimized
                  alt=""
                />
                <div className="text-green-100 relative z-50 lg:p-5 pl-5">
                  <div className="flex flex-col">
                    <p className="sm:text-3xl text-lg font-semibold py-3">
                      {item.title || item.name}
                    </p>
                    <CircularProgress
                      size={50}
                      classNames=" overflow-hidden"
                      progress={item.vote_average}
                    />
                  </div>
                  <p className="flex lg:flex-row flex-col lg:gap-2 text-sm text-gray-400 lg:mt-10 mb-3">
                    {genres.map(
                      (genre: any) =>
                        item.genre_ids.includes(genre.value) && (
                          <span key={genre.value}>{genre.label}</span>
                        )
                    )}
                  </p>
                  <div className="flex flex-col lg:flex-row justify-between lgitems-center items-start gap-2">
                    <p className="text-sm sm:pl-2 font-light text-gray-400 sm:block sm:font-normal w-[30rem] hidden">
                      {truncateAfterSpace(item.overview, 250)}
                    </p>
                    <Link
                      href={`/film/${item.title ? "" : "tv-"}${item.id}`}
                      className="justify-self-end"
                    >
                      <Button
                        className="bg-transparent border border-zinc-600 text-white  shadow-zinc-400/50 transition-all hover:bg-gray-600/30"
                        variant={"outline"}
                      >
                        Learn more
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <MovieScroll currentIndex={currentIndex} data={data} />
    </Carousel>
  );
};

export default Swiper;
