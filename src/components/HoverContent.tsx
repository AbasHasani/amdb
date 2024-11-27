"use client";
import { useMouse } from "@/hooks/useMouse";
import React, { useEffect, useRef } from "react";
import { BorderTrail } from "./core/border-trail";

const HoverContent = ({
  children,
  background,
  list
}: {
  children: React.ReactNode;
  background?: string;
  list?: boolean;
}) => {
  const { x, y } = useMouse({ type: "page" });
  const element = useRef<HTMLDivElement | null>(null);

  const getRelativePosition = () => {
    const rect = element.current?.getBoundingClientRect();
    if (!rect) return { relX: 0, relY: 0 };

    return {
      relX: x - rect.left - window.scrollX,
      relY: y - rect.top - window.scrollY,
    };
  };

  const { relX, relY } = getRelativePosition();
  return (
    <div
      className="relative group overflow-hidden bg-gray-800 p-[2px] rounded-xl h-full"
      ref={element}
      // style={
      //   {
      //     "--x": `${x - (element?.current?.offsetLeft ?? 0)}px`,
      //     "--y": `${y - (element?.current?.offsetTop ?? 0)}px`,
      //   } as React.CSSProperties
      // }
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          borderRadius: "0.75rem",
          background: `radial-gradient(
            200px circle at ${relX ?? 0}px ${relY ?? 0}px,
            #15ca82,
            transparent
          )`,
        }}
        className=""
      />
      <div
        className={`relative ${
          background ? background : "bg-gray-950/70"
        } z-10 rounded-xl h-full lg:min-h-[13rem] ${list ? "max-h-[26rem]" : ""} lg:max-h-none`}
      >
        {children}
      </div>
    </div>
  );
};

export default HoverContent;
