"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { FC } from "react";
import useMeasure from "react-use-measure";

const liClassNames = `text-sm text-gray-400 cursor-pointer hover:text-green-100 transition-all`;
const ulClassNames = `flex flex-col items-center`;
const content = {
  Movie: [
    {
      id: 1,
      name: "Top rated",
      link: "",
    },
    {
      id: 2,
      name: "Popular",
      link: "popular",
    },
    {
      id: 3,
      name: "Upcoming",
      link: "upcoming",
    },
    {
      id: 4,
      name: "Now playing",
      link: "now_playing",
    },
  ],
  TV: [
    {
      id: 1,
      name: "Top rated",
      link: "top_rated_tv",
    },
    {
      id: 2,
      name: "Popular",
      link: "popular_tv",
    },
    {
      id: 3,
      name: "Airing today",
      link: "airing_today",
    },
    {
      id: 4,
      name: "On The Air",
      link: "on_the_air",
    },
  ],
};

const ExpandpleToolbar: FC<{
  isOpen: boolean;
  maxWidth: number;
}> = ({ isOpen, maxWidth }) => {
  const [contentRef, { height: heightContent }] = useMeasure();

  return (
    <AnimatePresence initial={false} mode="sync">
      {isOpen ? (
        <motion.div
          key="content"
          initial={{ height: 0 }}
          animate={{ height: heightContent || 0 }}
          exit={{ height: 0 }}
          style={{
            width: maxWidth,
          }}
        >
          <div ref={contentRef} className="p-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              exit={{ opacity: 0 }}
            >
              <div
                className={cn("px-2 pt-2 text-sm", isOpen ? "block" : "hidden")}
              >
                {Object.entries(content).map(([key, value]) => (
                  <ul
                    key={key}
                    className={cn(ulClassNames, { "mb-2": key === "Movie" })}
                  >
                    <li className="mb-2">{key}</li>
                    {value.map((item) => (
                      <li key={item.id} className={liClassNames}>
                        <Link href={`/films/${item.link}`}>{item.name}</Link>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default ExpandpleToolbar;
