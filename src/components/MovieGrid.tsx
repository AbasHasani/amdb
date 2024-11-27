import Image from "next/image";
import React, { FC } from "react";
import CircularProgress from "./CircularProgressRing";
import { originalImgUrl, truncateAfterSpace } from "@/lib/utils";
import Link from "next/link";
import FadingImage from "./FadingImage";
import { BorderTrail } from "./core/border-trail";
import HoverContent from "./HoverContent";

const MovieGrid: FC<MovieListType> = ({ data }) => {
  return (
    <div className={`grid gap-3 md:grid-cols-4 grid-cols-2 text-white`}>
      {data.map((item) =>
        item.title || item.name != "null" ? (
          <HoverContent key={item.id} background="bg-black">
            <Link
              key={item.id}
              href={`/${
                item.media_type == "person" || item.profile_path == "person"
                  ? "cast"
                  : "film"
              }/${
                item.title
                  ? ""
                  : item.media_type == "person" || item.profile_path
                  ? ""
                  : "tv-"
              }${item.id}`}
              className="relative flex flex-col rounded-xl overflow-hidden border border-gray-800 group h-full"
            >
              <div className="relative overflow-hidden">
                <div className="absolute w-full h-full bg-gradient-to-t from-black  to-transparent to-40% z-10 transition-all" />
                <Image
                  src={
                    !item.poster_path && !item.profile_path
                      ? "/assets/noimg_edited.PNG"
                      : originalImgUrl +
                        (item.poster_path || item.profile_path)
                  }
                  width={100}
                  height={200}
                  unoptimized
                  alt="image"
                  className="w-full h-full object-cover rounded-md  transition-all bg-no-repeat max-h-[30rem] group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col gap-2 justify-between bg-gradient-to-t from-zinc-800/50 to-transparent flex-1">
                <CircularProgress
                  isCast={item.media_type !== "person" ? false : true}
                  classNames="-mt-8 z-20"
                  progress={
                    item.media_type !== "person"
                      ? item.vote_average
                      : Math.ceil(item.popularity) / 10
                  }
                  size={50}
                />
                <div className="flex flex-col">
                  <p>{truncateAfterSpace(item.title || item.name || "", 25)}</p>
                  <p className="pt-3 text-sm font-light text-gray-400">
                    {truncateAfterSpace(item?.overview || "", 130)}
                  </p>
                </div>
              </div>
            </Link>
          </HoverContent>
        ) : (
          ""
        )
      )}
    </div>
  );
};

export default MovieGrid;
