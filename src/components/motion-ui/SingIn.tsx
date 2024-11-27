"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import useMeasure from "react-use-measure";
import Link from "next/link";
import {
  generateRequestToken,
  generateSession,
} from "@/lib/actions/auth.actions";
import { useEffect, useState } from "react";

const SingIn = ({
  isOpen,
  maxWidth,
}: {
  isOpen: boolean;
  maxWidth: number;
}) => {
  const [contentRef, { height: heightContent }] = useMeasure();
  const [access_token, setAccess_token] = useState<any>(null);
  useEffect(() => {
    try {
      generateSession();
    } catch (error) {
      console.log("This has given an error");
    }
  }, []);
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
          <div className="p-2" ref={contentRef}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              exit={{ opacity: 0 }}
            >
              {!access_token ? (
                <form
                  className={cn(
                    "px-2 pt-2 text-sm",
                    isOpen ? "block" : "hidden"
                  )}
                  action={generateRequestToken}
                >
                  <p>{access_token?.message && "Get access token"}</p>
                  <p>
                    You will be redirected to the tmdb website to login and
                    verify your request token.
                  </p>
                  <Button className="my-3" type="submit">
                    Get request token
                  </Button>
                </form>
              ) : (
                <Link href="/user">Your page</Link>
              )}
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default SingIn;
