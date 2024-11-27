"use client";
import { useRef } from "react";
import { ScrollProgress } from "@/components/core/scroll-progress";
import dynamic from "next/dynamic";

const DynamicScrollProgress = dynamic(
  () => import("../core/scroll-progress").then((mod) => mod.ScrollProgress),
  {
    loading: () => <p>Loading...</p>,
  }
);

export function ScrollProgressBasic({
  children,
  height,
}: {
  children: React.ReactNode;
  height?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`overflow-auto h-[350px]`}
      style={{
        height: height || 350,
      }}
      ref={containerRef}
    >
      <div className="pointer-events-none absolute bottom-0 left-0 h-12 w-full bg-white to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_top,white,transparent)] dark:bg-neutral-900" />
      <div className="pointer-events-none absolute left-0 top-0 w-full">
        <div className="absolute left-0 top-0 h-1 w-full bg-[#E6F4FE] dark:bg-[#111927]" />
        <DynamicScrollProgress
          containerRef={containerRef}
          className="
          absolute top-0 bg-blue-300"
        />
      </div>
      {children}
    </div>
  );
}
