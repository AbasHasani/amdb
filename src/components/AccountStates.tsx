"use client";
import {
  Bookmark,
  Delete,
  Heart,
  List,
  Loader2,
  Plus,
  GripHorizontal,
  Trash2,
} from "lucide-react";

import { Button as ToolbarButton } from "./motion-ui/DynamicHeader";
import useBodyLock from "@/hooks/useBodyLock";
import { useEffect, useRef, useState } from "react";
import {
  addRating,
  getFilmAccountStatus,
  getLists,
  updateFaveWatch,
  updateListItems,
} from "@/lib/actions/user.actions";
import useClickOutside from "@/hooks/useClickOutside";
import AddRatingDialouge from "./AddRatingDialouge";
import { verifySession } from "@/lib/session";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import AddToListDialouge from "./AddToListDialouge";
import { Input } from "./ui/input";
import Combobox from "./combobox";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useParams, usePathname, useRouter } from "next/navigation";

const labels = [
  "feature",
  "bug",
  "enhancement",
  "documentation",
  "design",
  "question",
  "maintenance",
];

export default function ComboboxDropdownMenu({
  type,
  id,
  isSignedIn,
}: {
  type: "movie" | "tv";
  id: string;
  isSignedIn: boolean;
}) {
  const [label, setLabel] = React.useState("feature");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [statuses, setStatuses] = useState<{
    id: string;
    favorite: boolean;
    rated: {
      value: number;
    };
    watchlist: boolean;
  }>({
    id: "",
    favorite: false,
    rated: { value: 0 },
    watchlist: false,
  });
  useEffect(() => {
    if (!open || statuses.id) return;
    const getStatuses = async () => {
      setLoading(true);
      const filmAccountStatus = await getFilmAccountStatus(type, id);
      if (filmAccountStatus) {
        setStatuses(filmAccountStatus);
      }
      setLoading(false);
    };
    getStatuses();
  }, [open]);
  const container = useRef(null);
  useClickOutside(container, () => {
    setOpen(false);
  });

  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState("");
  useEffect(() => {
    setRatingValue("");
  }, [isRatingOpen]);

  const [isListOpen, setIsListOpen] = useState(false);
  const [listValue, setListValue] = useState("");
  const [listItems, setListItems] = useState([]);
  const getUserLists = async () => {
    setLoading(true);
    try {
      const Lists = await getLists();
      setListItems(
        Lists.results.map(({ id, name }: { id: string; name: string }) => ({
          label: name,
          value: id,
        }))
      );
      console.log(Lists);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    isListOpen ? getUserLists() : null;
  }, [isListOpen]);
  const params = useParams();
  const path = usePathname();
  const paramsListId = path.includes("list") && params ? params.id : null;
  const router = useRouter();
  const handleFavWatch = async (e: any, action: "favorite" | "watchlist") => {
    e.stopPropagation();
    const response = await updateFaveWatch(action, id, type, !statuses[action]);
    console.log(!statuses[action]);

    if (response?.success) {
      setStatuses({ ...statuses, [action]: !statuses[action] });
    }
    if (path.includes("favorite") || path.includes("watchlist")) {
      router.refresh();
    }
  };
  return (
    <div className="flex flex-col items-start justify-between rounded-md px-4 py-3 sm:flex-row sm:items-center -mt-8 lg:-mt-0">
      <DropdownMenu
        open={open}
        onOpenChange={(val) => {
          if (isSignedIn) {
            setOpen(val);
          } else {
            setOpen(false);
            toast({
              title: "You need to sign in to do this",
              action: (
                <ToastAction
                  altText="Sign in"
                  onClick={() => {
                    router.push("/sign-in");
                  }}
                >
                  Sign in
                </ToastAction>
              ),
            });
          }
        }}
      >
        <DropdownMenuTrigger
          asChild
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <GripHorizontal className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[200px]"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={async (e) => handleFavWatch(e, "favorite")}
              className="cursor-pointer"
            >
              <Heart className={statuses.favorite ? "text-red-400" : ""} />
              <span>Favorite</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async (e) => handleFavWatch(e, "watchlist")}
              className="cursor-pointer"
            >
              <Bookmark className={statuses.watchlist ? "text-cyan-400" : ""} />
              <span>Watchlist</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsRatingOpen((prev) => !prev);
              }}
            >
              <Button
                className="[&_svg]:size-5 !px-0 !py-0 m-0 gap-0 w-fit h-fit"
                variant={"ghost"}
                size={"icon"}
                onClick={async (e) => {
                  if (!ratingValue) return;
                  setLoading(true);
                  const response = await addRating(
                    id,
                    parseFloat(ratingValue),
                    type,
                    false
                  );
                  if (response?.success) {
                    toast({
                      title: "Rating added",
                      description: "Your rating has been added to the item",
                      action: <ToastAction altText="Undo">OK!</ToastAction>,
                    });
                  } else {
                    toast({
                      variant: "destructive",
                      title: "Adding rating failed",
                      description: `Some error happended`,
                      action: <ToastAction altText="Undo">OK</ToastAction>,
                    });
                  }
                  setLoading(false);
                }}
              >
                <Plus
                  className={`${statuses.watchlist ? "text-cyan-400" : ""} ${
                    isRatingOpen && !ratingValue ? "rotate-45" : ""
                  } transition-all ${
                    ratingValue ? "bg-green-300/50 rounded-md" : ""
                  }`}
                />
              </Button>
              {isRatingOpen ? (
                <Input
                  type="text"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  value={ratingValue}
                  onChange={(e) => setRatingValue(e.target.value)}
                  className="h-full m-0"
                  placeholder="number must be a multiple of 0.5"
                  autoFocus
                  onBlur={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    e.target.focus();
                  }}
                />
              ) : (
                <span>Rating</span>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger
                onMouseEnter={() => {
                  setRatingValue("");
                  setIsRatingOpen(false);
                  setIsListOpen((prev) => !prev);
                }}
                className="hidden lg:flex cursor-pointer"
              >
                <List />
                Add to list
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="ml-2 p-0">
                <Command>
                  <CommandInput
                    placeholder="Filter label..."
                    autoFocus={true}
                  />
                  <CommandList>
                    <CommandEmpty>No label found.</CommandEmpty>
                    <CommandGroup>
                      {listItems.map(({ value, label }) => (
                        <CommandItem
                          key={label}
                          value={label}
                          onSelect={async (currentValue) => {
                            setLabel(currentValue);
                            setOpen(false);
                            setLoading(true);
                            const response = await updateListItems(
                              value,
                              id,
                              type
                            );
                            if (response?.success) {
                              toast({
                                title: "item added",
                                description: `Your added the item to ${currentValue}`,
                                action: (
                                  <ToastAction altText="Undo">OK</ToastAction>
                                ),
                              });
                            } else {
                              toast({
                                variant: "destructive",
                                title: "Adding to list failed",
                                description: `Some error happended`,
                                action: (
                                  <ToastAction altText="Undo">OK</ToastAction>
                                ),
                              });
                            }
                            setLoading(false);
                          }}
                        >
                          {label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            {paramsListId && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-800 hover:text-red-700"
                  onClick={() => {
                    setLoading(true);
                    const response = updateListItems(
                      //@ts-ignore
                      paramsListId,
                      id,
                      type,
                      true
                    );
                    setLoading(false);
                    router.refresh();
                  }}
                >
                  <Trash2 />
                  Delete from list
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
