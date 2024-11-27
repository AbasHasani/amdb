import { calculateAge, originalImgUrl } from "@/lib/utils";
import Image from "next/image";
import React, { FC } from "react";
import CircularProgress from "./CircularProgressRing";
import MovieActions from "./MovieActions";
import Link from "next/link";
import { motion } from "framer-motion";
// Background: bg-gradient-to-l from-[#1b0c4d] to-transparent

import SocialItem from "./SocialItem";
import FadingImage from "./FadingImage";
import FadingBackgroundImage from "./FadingBackgroundImage";
import { TextEffect } from "./core/text-effect";
import { AnimatedGroup } from "./core/animated-group";
const Heading: FC<{
  type: "movie" | "cast";
  data: any;
  isTvShow?: boolean;
}> = ({ type, data, isTvShow }) => {
  return (
    <div className="relative flex justify-between items-center heading">
      <FadingBackgroundImage
        src={
          originalImgUrl +
          (type === "movie" ? data.backdrop_path : data.profile_path)
        }
      />
      <div className="z-10 flex flex-col lg:flex-row flex-1 lg:flex-auto">
        <div className="h-full flex items-center justify-center my-5 sm:mb-0">
          <AnimatedGroup
            variants={{
              container: {
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              },
              item: {
                hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: {
                    duration: 1.2,
                    type: "spring",
                    bounce: 0.3,
                  },
                },
              },
            }}
          >
            <Image
              src={
                originalImgUrl +
                (type === "movie" ? data.poster_path : data.profile_path)
              }
              width={200}
              unoptimized
              priority
              height={400}
              alt=""
              className="w-[20rem] sm:w-[18rem] h-full md:m-[2rem] rounded-md"
            />
          </AnimatedGroup>
        </div>
        <div className="lg:my-[2rem] pl-5 pt-2">
          <div className="flex lg:flex-col justify-between lg:justify-start px-5 items-start lg:items-start gap-2">
            <div className="flex-col">
              <h2 className="text-base sm:text-2xl font-semibold">
                <TextEffect per="char" preset="fade">
                  {type === "movie" ? data.title || data.name : data.name}
                </TextEffect>
              </h2>
              <div className="flex flex-col">
                <p className="mr-5">
                  {type === "movie" ? (
                    data.runtime ? (
                      data.runtime + "'"
                    ) : (
                      ""
                    )
                  ) : (
                    <span className="flex">
                      <span>{data.deathday}</span>
                    </span>
                  )}
                </p>
                <p>
                  {type === "movie" ? (
                    data.release_date || data.first_air_date
                  ) : (
                    <span className="flex lg:flex-row flex-col mt-2 lg:mt-0 gap-4 lg:items-center items-start">
                      <span>{data.birthday}</span>
                      <span className="text-gray-400 font-light italic text-sm">
                        {calculateAge(data.birthday)}
                      </span>
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="lg:my-8 mb-1">
              <CircularProgress
                size={80}
                isCast={type === "cast" ? true : false}
                progress={
                  type === "movie"
                    ? data.vote_average
                    : Math.ceil(data.popularity) / 10
                }
              />
            </div>
          </div>
          {type === "movie" ? (
            <div className="my-3">
              <MovieActions
                isTvShow={isTvShow}
                id={data.id}
                accountStates={data.account_states}
              />
            </div>
          ) : null}
          {type === "movie" ? (
            <div>
              <p>{data.tagline}</p>
              <div>
                <TextEffect per="word" as="h3" preset="slide">
                  {`${data.genres.map((item: any) => item.name)}`}
                </TextEffect>
              </div>
              <div className="">
                <h2 className="text-gray-400 italic">Overview:</h2>
                <div className="max-w-[30rem] text-sm font-light md:text-base text-green-100">
                  <TextEffect
                    per="line"
                    as="p"
                    segmentWrapperClassName="overflow-hidden block"
                    variants={{
                      container: {
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: { staggerChildren: 0.2 },
                        },
                      },
                      item: {
                        hidden: {
                          opacity: 0,
                          y: 40,
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.4,
                          },
                        },
                      },
                    }}
                  >
                    {data.overview}
                  </TextEffect>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <h2 className="text-gray-400 italic">Place of birth:</h2>
                <p className="max-w-[30rem] text-sm font-light md:text-base text-green-100">
                  {data.place_of_birth}
                </p>
              </div>
              <div>
                <h2 className="text-gray-400 italic">Adult:</h2>
                <p className="max-w-[30rem] text-sm font-light md:text-base text-green-100">
                  {data.adult ? "Yes" : "No"}
                </p>
              </div>
              <div>
                <h2 className="text-gray-400 italic">Gender:</h2>
                <p className="max-w-[30rem] text-sm font-light md:text-base text-green-100">
                  {data.gender === 1 ? "Female" : "Male"}
                </p>
              </div>
            </div>
          )}
          <div className="grid grid-cols-4 gap-5 py-5">
            {type === "movie" &&
              data.credits.crew
                .filter((item: any, index: number, self: any) => {
                  return (
                    (item.department === "Directing" ||
                      item.department === "Writing") &&
                    self.findIndex(
                      (i: any) => i.department === item.department
                    ) === index
                  );
                })
                ?.map((crew: any) => (
                  <Link
                    href={"/cast/" + crew.credit_id}
                    key={crew.credit_id}
                    className={``}
                  >
                    <span className="text-gray-400 italic font-light flex flex-col">
                      {crew.department}
                    </span>
                    <span>{crew.name}</span>
                  </Link>
                ))}
            {type === "movie" &&
              !data.title &&
              data.created_by.map((creator: { name: string; id: string }) => (
                <Link
                  key={"/cast/" + creator.id}
                  href={"/cast/" + creator.id}
                  className={``}
                >
                  <span className="text-gray-400 italic font-light flex flex-col">
                    Creator
                  </span>
                  <span>{creator.name}</span>
                </Link>
              ))}
          </div>
        </div>
      </div>
      <div className="">
        {type === "movie" && data["watch/providers"]?.results?.US ? (
          <div className="hidden sm:flex pt-5 flex-col gap-2 pr-10">
            <h2 className="text-black italic">Watch Providers (US)</h2>

            {data["watch/providers"].results?.US?.buy?.map((item: any) => (
              <div key={item.provider_id}>
                <Link
                  href={data["watch/providers"].results.US.link}
                  className="text-sm font-light text-black md:text-base md:text-green-100 flex items-center gap-3 group"
                >
                  <p className="pl-3 text-black group-hover:text-green-100 italic transition-all whitespace-nowrap">
                    - {item.provider_name}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        ) : type === "cast" && data.name && data.external_ids ? (
          <div className="hidden lg:flex pr-[5rem] pt-5 flex-col gap-2">
            <h2 className="text-gray-400 italic">Socials:</h2>
            <SocialItem link={data.external_ids.imdb_id} name="imdb" />
            <SocialItem link={data.external_ids["twitter_id"]} name="twitter" />
            <SocialItem
              link={data.external_ids["instagram_id"]}
              name="instagram"
            />
            <SocialItem link={data.external_ids["youtube_id"]} name="youtube" />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Heading;
