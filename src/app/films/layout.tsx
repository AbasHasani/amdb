import DiscoverSheet from "@/components/DiscoverSheet";
import { AnimatedTabs } from "@/components/motion-ui/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import SearchBar from "./SearchBar";

const TABS = [
  {
    id: "/films/toprated",
    label: "",
    expandble: true,
    items: [
      {
        id: "/films",
        label: "Top Rated",
      },
      {
        id: "/films/top_rated_tv",
        label: "Top Rated TV",
      },
    ],
  },
  {
    id: "/films/popular",
    label: "",
    expandble: true,
    items: [
      {
        id: "/films/popular",
        label: "Popular",
      },
      {
        id: "/films/popular_tv",
        label: "Popular TV",
      },
    ],
  },
  {
    id: "/films/nowplaying",
    label: "",
    expandble: true,
    items: [
      {
        id: "/films/now_playing",
        label: "Now Playing",
      },
      {
        id: "/films/airing_today",
        label: "Aiaring Today TV",
      },
    ],
  },
  {
    id: "/films/[",
    label: "",
    expandble: true,
    items: [
      {
        id: "/films/upcoming",
        label: "Upcoming",
      },
      {
        id: "/films/on_the_air",
        label: "On the Air TV",
      },
    ],
  },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-green-100 p-3">
      <div className="flex flex-col lg:flex-row items-center">
        <AnimatedTabs TABS={TABS} classNames="" />
        <div className="ml-10 flex gap-3 mt-3 lg:mt-0">
          <SearchBar />
          <DiscoverSheet />
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
