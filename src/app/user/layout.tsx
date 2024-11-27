import { AnimatedTabs } from "@/components/motion-ui/AnimatedBackground";
import { verifySession } from "@/lib/session";
import { originalImgUrl } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  //@ts-ignore
  const { profile, username, sessionId,accountId }: UserSession = await verifySession();
  const TABS = [
    {
      label: "Lists",
      id: "/user",
      expandble: false,
      items: null,
    },
    {
      label: "Favorites",
      id: "/user/s/favorites",
      expandble: true,
      items: [
        {
          id: "/user/s/favorites/movie",
          label: "Movies",
        },
        {
          id: "/user/s/favorites/tv",
          label: "TV",
        },
      ],
    },
    {
      label: "Rating",
      id: "/user/s/rated",
      expandble: true,
      items: [
        { id: "/user/s/rated/movie", label: "Movie" },
        { id: "/user/s/rated/tv", label: "TV" },
      ],
    },
    {
      label: "Watchlist",
      id: "/user/s/watchlist",
      expandble: true,
      items: [
        { id: "/user/s/watchlist/movie", label: "Movie" },
        { id: "/user/s/watchlist/tv", label: "TV" },
      ],
    },
  ];
  return (
    <div className="container">
      <div className="flex flex-col  items-center pt-3 border-b border-green-800/30 pb-3 shadow-xl shadow-green-950/40">
        <div className="border-[4px] rounded-full p-1 border-green-800/30">
          <Image
            src={originalImgUrl + profile}
            width={200}
            height={200}
            alt="user-image"
            className="w-[15rem] rounded-full shadow-xl shadow-green-800/30"
          />
        </div>
        <p className="p-3 m-3 font-bold text-lg">{username}</p>
        <p>AID: {accountId}</p>
        <p>SI: {sessionId}</p>
        <AnimatedTabs
          TABS={TABS}
          classNames="flex justify-center items-center"
        />
      </div>
      {children}
    </div>
  );
};

export default Layout;
