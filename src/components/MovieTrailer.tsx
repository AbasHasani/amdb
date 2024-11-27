"use client";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
//@ts-ignore
import movieTrailer from "movie-trailer";

const MovieTrailer = ({
  movieName,
  id,
  classNames,
}: {
  movieName: string;
  classNames?: string;
  id: string | undefined;
}) => {
  const [url, setUrl] = useState("");
  const screenWidth = typeof window === "undefined" ? 0 : window.innerWidth;
  const playerHeight = screenWidth <= 600 ? 300 : 600;
  useEffect(() => {
    if (!id) {
      movieTrailer(movieName).then((res: string) => setUrl(res));
    }
  }, []);

  const opts = {
    width: "100%",
    height: playerHeight,
    borderRadius: "2rem",
    // playerVars: { autoplay: 1 },
  };
  const videoReady = (event: any) => {
    event.target.pauseVideo();
  };
  if (!id && !movieName) return null;
  return (
      <div className="col-span-3">
        <div className={`w-full max-h-[1000px] overflow-hidden ${classNames}`}>
          <YouTube
            videoId={id || (url ? url.substring(url.indexOf("=") + 1) : "")}
            opts={opts}
            // onReady={videoReady}
          />
        </div>
      </div>
  );
};

export default MovieTrailer;
