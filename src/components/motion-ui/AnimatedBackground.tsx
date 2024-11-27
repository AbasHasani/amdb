"use client";
import React from "react";
import AnimatedBackground from "../core/animated-background";
import { Button } from "../ui/button";
import Link from "next/link";
import MovieOrTv from "../MovieOrTv";

export const AnimatedTabs = ({
  TABS,
  classNames,
  notLink,
  callback,
}: {
  TABS: {
    id: string;
    label: string;
    expandble: boolean;
    items:
      | {
          label: string;
          id: string;
        }[]
      | null;
  }[];
  classNames: string;
  notLink?: boolean;
  callback?: (val: string | null) => void;
}) => {
  return (
    <div className={classNames}>
      <div className="flex w-full lg:space-x-2 rounded-xl border border-zinc-950/10 lg:p-2">
        <AnimatedBackground
          defaultValue={TABS[0].label}
          className="rounded-lg bg-green-800"
          onValueChange={(value) => callback && callback(value)}
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.3,
          }}
        >
          {TABS.map(({ label, id, expandble, items }) =>
            expandble ? (
              <div data-id={id} key={id} className="relative">
                <MovieOrTv label={label} id={id} items={items} />
              </div>
            ) : (
              <Button
                key={label}
                data-id={label}
                type="button"
                variant={"ghost"}
                className="relative flex shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg text-white transition-colors hover:bg-gray-500/20 focus-visible:ring-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 outline-none !px-2 !py-0"
              >
                {!notLink ? <Link href={id}>{label}</Link> : label}
              </Button>
            )
          )}
        </AnimatedBackground>
      </div>
    </div>
  );
};
