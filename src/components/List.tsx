"use client";
import { AnimatedGroup } from "@/components/core/animated-group";
import Image from "next/image";
import { FC, useCallback, useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import { Button } from "./ui/button";
import CircularProgress from "./CircularProgressRing";
import Link from "next/link";
import { BorderTrail } from "./core/border-trail";
import { ChevronRight, ChevronLeft, GripHorizontal } from "lucide-react";
import { truncateAfterSpace } from "@/lib/utils";
import HoverContent from "./HoverContent";
import AccountStates from "./AccountStates";
import { TextEffect } from "./core/text-effect";
import { verifySession } from "@/lib/session";
import AddToListBtn from "./AddToListBtn";
import AddToListDialouge from "./AddToListDialouge";
import { List as ListIcon } from "lucide-react";
const List: FC<any> = ({ data, type, title }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const scrollPrev = useCallback(() => {
    if (api) api.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    if (api) api.scrollNext();
  }, [api]);

  useEffect(() => {
    const getUseStatus = async () => {
      const auth = await verifySession();
      if (auth) {
        setIsSignedIn(true);
      }
      console.log(auth);
    };
    getUseStatus();
  }, []);

  if (data?.length < 1) {
    return (
      <TextEffect
        per="char"
        preset="fade"
        className="bg-gradient-to-br from-green-950/50 p-10 flex justify-center items-center to-transparent  rounded-md"
      >
        {`Ooops there are no items here!!!`}
      </TextEffect>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="text-xl font-semibold text-gray-400 italic m-5 mt-8">
          {title}
        </h2>
      )}
      <Carousel
        className="text-green-100 mx-1 relative"
        opts={{
          dragFree: true,
          slidesToScroll: 4,
        }}
        setApi={setApi}
      >
        <CarouselContent>
          {data.map((item: any, i: number) => (
            <CarouselItem
              key={item.id + (item.title || item.name) + i}
              className={`md:basis-1/4 sm:basis-1/4 basis-3/5`}
            >
              <HoverContent list>
                <Link
                  href={`/${type === "movie" ? "film" : "cast"}/${
                    type === "movie" && !item.title ? "tv-" : ""
                  }${item.id}`}
                  className="relative flex flex-col h-full rounded-xl overflow-hidden group bg-black"
                >
                  <div className="relative z-10">
                    <div
                      className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent to-50% z-10 group-hover:scale-105
                    transition-all"
                    />
                    <Image
                      src={
                        !item.poster_path && !item.profile_path
                          ? "/assets/noimg_edited.PNG"
                          : "https://image.tmdb.org/t/p/original" +
                            (type === "movie"
                              ? item.poster_path
                              : item.profile_path)
                      }
                      width={100}
                      height={200}
                      alt=""
                      unoptimized
                      className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-all bg-no-repeat max-h-[30rem]"
                    />
                  </div>

                  <div className="p-5 flex flex-col gap-2 justify-between bg-gradient-to-t from-gray-900/60 to-transparent flex-1 h-full">
                    <div className="flex justify-between h-full">
                      <CircularProgress
                        isCast={type == "movie" ? false : true}
                        classNames="-mt-8 z-20"
                        progress={
                          type === "movie"
                            ? item.vote_average
                            : Math.ceil(item.popularity) / 10
                        }
                        size={40}
                      />
                      {type == "movie" && (
                        <div className="flex items-center">
                          <AccountStates
                            type={item.title ? "movie" : "tv"}
                            id={item.id}
                            isSignedIn={isSignedIn}
                          />
                          <AddToListDialouge
                            icon={<ListIcon />}
                            isSignedIn={isSignedIn}
                            id={item.id}
                            type={item.title ? "movie" : "tv"}
                            marginTop
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col justify-center">
                      {type === "cast" && (
                        <p className="font-light text-gray-400 italic">
                          {item.character}
                        </p>
                      )}
                      <p>
                        {truncateAfterSpace(item.title || item.name || "", 25)}
                      </p>
                      <p className="hidden lg:block pt-3 text-sm font-light text-gray-400">
                        {truncateAfterSpace(item?.overview || "", 37)}
                      </p>
                    </div>
                  </div>
                </Link>
              </HoverContent>
            </CarouselItem>
          ))}
        </CarouselContent>
        <Button
          className="opacity-20 hover:opacity-100 hidden lg:flex absolute top-1/2 -right-10 rounded-lg w-[4rem] h-[4rem] backdrop-blur-lg bg-black/20 text-white text-xl border border-white hover:bg-gray-600/20 transition-colors justify-center items-center [&_svg]:size-9"
          onClick={() => scrollNext()}
        >
          <ChevronRight size={25} />
        </Button>
        <Button
          className="opacity-20 hover:opacity-100 hidden lg:flex absolute top-1/2 -left-10  rounded-lg w-[4rem] h-[4rem] backdrop-blur-lg bg-black/20 text-white text-xl border border-white hover:bg-gray-600/20 transition-colors justify-center items-center [&_svg]:size-9"
          onClick={() => scrollPrev()}
        >
          <ChevronLeft size={25} />
        </Button>
      </Carousel>
    </div>
  );
};

export default List;
