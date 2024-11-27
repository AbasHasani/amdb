"use client";
import React, { useEffect, useRef, useState } from "react";
import useMeasure from "react-use-measure";
import { motion, MotionConfig } from "framer-motion";
import useClickOutside from "@/hooks/useClickOutside";
import { ArrowLeft, Search, User, Home, LogIn, Star, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import Link from "next/link";
import SearchResultItem from "../SearchResultItem";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { getSearchResults } from "@/lib/api/tmdb";
import StarFilms from "../AccountStates";
import ExpandpleToolbar from "./StarExpandpleToolbar";
import SingIn from "./SingIn";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { verifySession } from "@/lib/session";
import Image from "next/image";
import { cn, originalImgUrl } from "@/lib/utils";
import Expandble from "./Expandble";

const transition = {
  type: "spring",
  bounce: 0.1,
  duration: 0.2,
};

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

export function Button({
  children,
  onClick,
  disabled = false,
  ariaLabel,
  classNames,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  classNames?: string;
}) {
  return (
    <button
      className={cn(
        "relative flex h-9 w-9 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 focus-visible:ring-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        classNames
      )}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export default function ToolbarDynamic({ user }: { user: UserSession | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isStarOpen, setIsStarOpen] = useState(false);
  const [isSignOpen, setIsSignOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [results, setResults] = useState<SearchResultType[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const router = useRouter();

  const [menuRef, { width: widthContainer }] = useMeasure();
  const [maxWidth, setMaxWidth] = useState(0);
  const handleSearch = async () => {
    setLoading(true);
    const data = await getSearchResults(searchTerm);
    setResults(data.results.reverse());
    setLoading(false);
  };
  useEffect(() => {
    searchTerm && handleSearch();
  }, [debouncedSearchTerm]);
  useClickOutside(containerRef, () => {
    setResults([]);
    setIsOpen(false);
    setIsStarOpen(false);
    setIsSignOpen(false);
  });
  useEffect(() => {
    if (!widthContainer || maxWidth > 0) return;

    setMaxWidth(widthContainer);
  }, [widthContainer, maxWidth]);

  return (
    <MotionConfig transition={transition}>
      <div
        className="fixed bottom-8 z-50 left-1/2 -translate-x-1/2  rounded-"
        ref={containerRef}
      >
        <div className="h-full w-full border border-gray-500 rounded-xl backdrop-blur-lg shadow-lg shadow-zinc-800/50 bg-black/50">
          <div className="overflow-hidden">
            <Expandble isOpen={isStarOpen} maxWidth={maxWidth}>
              <div
                className={cn(
                  "px-2 pt-2 text-sm",
                  isStarOpen ? "block" : "hidden"
                )}
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
            </Expandble>
          </div>
          {!user && (
            <div className="overflow-hidden">
              <SingIn isOpen={isSignOpen} maxWidth={maxWidth} />
            </div>
          )}
          <motion.div
            animate={{
              // @todo: here I want to remove the width
              width: isOpen ? "auto" : "184px",
            }}
            initial={false}
          >
            <div className="overflow-hidden p-2" ref={menuRef}>
              {!isOpen ? (
                <div className="flex space-x-2">
                  <Link href={"/"}>
                    <Button ariaLabel="User profile">
                      <Home className="h-5 w-5" />
                    </Button>
                  </Link>
                  {/* Shadcn -> <StarFilms /> */}
                  <Button
                    ariaLabel="User profile"
                    onClick={() => setIsStarOpen((p) => !p)}
                  >
                    <Star className="h-5 w-5" />
                  </Button>
                  <Button
                    onClick={() => setIsOpen(true)}
                    ariaLabel="Search notes"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                  <Button
                    ariaLabel="User profile"
                    onClick={() =>
                      !user
                        ? setIsSignOpen((prev) => !prev)
                        : router.push("/user")
                    }
                    classNames="group "
                  >
                    {!user ? (
                      <LogIn className="h-5 w-5" />
                    ) : (
                      <Image
                        src={originalImgUrl + user.profile}
                        width={200}
                        height={400}
                        alt="users-image"
                        className="rounded-[50%] group-hover:rounded-sm transition-all grayscale group-hover:grayscale-0"
                      />
                    )}
                    {/* {user?.profile} */}
                  </Button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Button
                    onClick={() => {
                      setIsOpen(false);
                      setResults([]);
                    }}
                    ariaLabel="Back"
                  >
                    <ArrowLeft className={`h-5 w-5 ${loading ? "hidden" : ""}`} />
                    <Loader2 className={`h-5 w-5 animate-spin ${loading ? "" : "hidden"}`} />
                  </Button>
                  <div className="relative w-full">
                    <Input
                      className="h-9 w-[17rem] lg:w-[23rem] rounded-lg border border-zinc-950/10 bg-transparent p-2 focus-visible:border-zinc-500/50 !placeholder-zinc-300 focus:outline-none text-white"
                      autoFocus
                      placeholder="Search notes"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          setResults([]);
                          router.push(`/films/search?q=${searchTerm}`);
                        } else {
                          null;
                        }
                      }}
                    />
                    <div className="absolute right-1 top-0 flex h-full items-center justify-center"></div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
        <SearchResultItem results={results} />
      </div>
    </MotionConfig>
  );
}
