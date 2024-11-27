"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { FC } from "react";
import useMeasure from "react-use-measure";
const Expandble = ({
  maxWidth,
  isOpen,
  children,
  notFixed,
}: {
  maxWidth: number;
  isOpen: boolean;
  children: React.ReactNode;
  notFixed?: boolean;
}) => {
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
          className={notFixed ? "absolute top-full" : ""}
        >
          <div ref={contentRef} className="p-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              exit={{ opacity: 0 }}
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Expandble;
