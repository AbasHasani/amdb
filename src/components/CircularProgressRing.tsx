import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { AnimatedNumber } from "./core/animated-number";

const movieColor = (item: { vote_average: number }) =>
  item.vote_average > 8
    ? "stroke-green-800"
    : item.vote_average > 7
    ? "stroke-green-400"
    : item.vote_average > 6
    ? "stroke-yellow-500"
    : "stroke-yellow-100";
const castColor = (item: { popularity: number }) =>
  item.popularity > 90
    ? "stroke-blue-800"
    : item.popularity > 80
    ? "stroke-blue-400"
    : item.popularity > 70
    ? "stroke-blue-200"
    : item.popularity > 60
    ? "stroke-blue-100"
    : item.popularity > 50
    ? "stroke-red-400"
    : item.popularity > 40
    ? "stroke-red-200"
    : item.popularity > 30
    ? "stroke-red-100"
    : item.popularity > 20
    ? "stroke-red-300"
    : "stroke-red-800";

const CircularProgress = ({
  progress = 80,
  size = 75,
  strokeWidth = 8,
  isCast,
  children,
  classNames,
}: {
  children?: ReactNode;
  progress?: number;
  size?: number;
  strokeWidth?: number;
  isCast?: boolean;
  classNames?: string;
}) => {
  // Adjust radius to account for stroke width
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - ((progress * 10) / 100) * circumference;

  return (
    <div className={cn(classNames)}>
      <div
        className={`relative inline-block `}
         style={{ width: size, height: size }}
      >
        {/* SVG progress ring */}
        <svg
          width={size}
          height={size}
          className="absolute top-0 left-0 transform -rotate-90"
        >
          <defs>
            <clipPath id="circle-clip">
              <circle cx={size / 2} cy={size / 2} r={radius} />
            </clipPath>
          </defs>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="stroke-gray-200"
            fill="none"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className={`${
              isCast
                ? castColor({ popularity: progress * 10 })
                : movieColor({ vote_average: progress })
            } transition-all duration-500`}
            fill="none"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        {/* Content div */}
        <div
          className="absolute rounded-full bg-black shadow-md flex items-center justify-center overflow-hidden"
          style={{
            top: strokeWidth / 2,
            left: strokeWidth / 2,
            right: strokeWidth / 2,
            bottom: strokeWidth / 2,
          }}
        >
          {children || (
            <span
              className={`${
                size <= 40 ? "text-sm" : "text-lg"
              }  font-semibold !text-green-100`}
            >
              {progress
                ? isCast
                  ? (progress * 10).toString().substring(0, 3)
                  : progress.toString().substring(0, 3)
                : "N/A"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;
