"use client";
import React, { FC, useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { ScrollProgressBasic } from "./motion-ui/ScrollProgress";




const Details: FC<{ data: MovieDetailsType } & { hasTrailer?: boolean }> = ({
  data,
  hasTrailer,
}) => {
  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
    if (typeof window === "undefined") {
      setScreenWidth(0);
    } else {
      setScreenWidth(window.innerWidth);
    }
  }, []);
  const playerHeight = screenWidth <= 600 ? 400 : 600;

  return (
    <div className="relative">
      <ScrollProgressBasic height={playerHeight}>
        <div
          className={`${
            hasTrailer ? "col-start-4" : "col-span-4"
          } p-3 overflow-hidden`}
        >
          <h1 className="p-5">Details:</h1>
          <ul
            className={`flex-col ${
              !hasTrailer
                ? "grid grid-cols-1 md:grid-cols-2 gap-3 "
                : "flex text-blue-300"
            }`}
          >
            <li className="flex flex-col">
              <span className="italic text-gray-400 font-light">Budget:</span>{" "}
              <span>{data.budget}</span>
              <Separator className="my-4 bg-gray-600" />
            </li>
            <li className="flex flex-col">
              <Link
                href={data.homepage}
                className="underline italic text-blue-600"
              >
                Home page
              </Link>
              <Separator className="my-4 bg-gray-600" />
            </li>
            <li className="flex flex-col">
              <span className="italic text-gray-400 font-light">Revenue:</span>{" "}
              <span>{data.revenue}</span>
              <Separator className="my-4 bg-gray-600" />
            </li>
            <li className="flex flex-col">
              <span className="italic text-gray-400 font-light">
                List of countries:
              </span>
              <ol>
                {data.production_countries.map((country) => (
                  <li key={country.iso_3166_1}>{country.name}</li>
                ))}
              </ol>
              <Separator className="my-4 bg-gray-600" />
            </li>
            <li className="flex flex-col">
              <span className="italic text-gray-400 font-light">
                List of languages:
              </span>
              <ol>
                {data.spoken_languages.map((language) => (
                  <li key={language.iso_639_1}>{language.english_name}</li>
                ))}
              </ol>
              <Separator className="my-4 bg-gray-600" />
            </li>
            <li className="flex flex-col">
              <span className="italic text-gray-400 font-light">
                List of companies:
              </span>
              <ol>
                {data.production_companies.map((company) => (
                  <li key={company.id}>{company.name}</li>
                ))}
              </ol>
              <Separator className="my-4 bg-gray-600" />
            </li>
            <li className="flex flex-col">
              <span className="italic text-gray-400 font-light">
                Vote Count:
              </span>{" "}
              <span>{data.vote_count}</span>
              <Separator className="my-4 bg-gray-600" />
            </li>
            <li className="flex flex-col">
              <span className="italic text-gray-400 font-light">
                Popularity:
              </span>{" "}
              <span>{data.popularity}</span>
              <Separator className="my-4 bg-gray-600" />
            </li>
            <li className="flex flex-col">
              <span className="italic text-gray-400 font-light">Status:</span>{" "}
              <span>{data.status}</span>
              <Separator className="my-4 bg-gray-600" />
            </li>
            <li className="flex flex-col">
              <span className="italic text-gray-400 font-light">
                Original title:
              </span>
              <span>{data.original_title}</span>
              <Separator className="my-4 bg-gray-600" />
            </li>
          </ul>
        </div>
      </ScrollProgressBasic>
    </div>
  );
};

export default Details;
