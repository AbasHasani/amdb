"use client";
import { FaThList, FaBookmark, FaPlay, FaHeart, FaPlus } from "react-icons/fa";
import { Button } from "./ui/button";
import {
  Bookmark,
  Heart,
  List,
  Loader,
  Loader2,
  Play,
  Plus,
} from "lucide-react";
import { BookmarkFilledIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "./ui/toast";
import { ToastDemo } from "./Toast";
import { useEffect, useState } from "react";
import { updateFaveWatch } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import AddRatingDialouge from "./AddRatingDialouge";
import AddToListDialouge from "./AddToListDialouge";

const MovieActions = ({
  isTvShow,
  id,
  accountStates,
}: {
  isTvShow?: boolean;
  id: string;
  accountStates: {
    watchlist: boolean;
    favorite: boolean;
    rated:
      | {
          value: number;
        }
      | false;
  };
}) => {
  const { toast } = useToast();
  const [loadingAction, setLoadingAction] = useState<string>("");
  const [actions, setActions] = useState<
    {
      icon: JSX.Element;
      trueIcon: null | JSX.Element | number;
      id: string;
      isChecked: boolean;
    }[]
  >([
    {
      icon: <List />,
      trueIcon: null,
      id: "list",
      isChecked: false,
    },
    {
      icon: <Heart />,
      trueIcon: <HeartFilledIcon />,
      id: "favorite",
      isChecked: accountStates ? accountStates.favorite : false,
    },
    {
      icon: <Plus />,
      trueIcon: null,
      id: "rated",
      isChecked: accountStates?.rated ? true : false,
    },
    {
      icon: <Bookmark />,
      id: "watchlist",
      trueIcon: <BookmarkFilledIcon />,
      isChecked: accountStates ? accountStates.watchlist : false,
    },
  ]);
  const router = useRouter();
  const handleAction = async (action: string) => {
    if (action == "rated") return;
    if (!accountStates) {
      toast({
        title: "You are not signed in",
        description: "You should be signed in to be able to do this",
        action: <ToastAction altText="Goto schedule to undo">OK</ToastAction>,
      });
      return;
    }
    setLoadingAction(action);
    const type = isTvShow ? "tv" : "movie";
    //@ts-ignore
    const add = !accountStates[action];

    const response = await updateFaveWatch(action, id, type, add);
    setLoadingAction("");
    if (response?.success) {
      setActions((prev) => {
        return prev.map((item) => {
          if (item.id == action) {
            return { ...item, isChecked: !item.isChecked };
          }
          return item;
        });
      });
    }
    
    // console.log(response?.success);

    // router.refresh();
  };
  return (
    <ul className="flex gap-2 my-3 mt-8">
      {actions.map(({ id: itemId, icon, trueIcon, isChecked }) =>
        itemId == "rated" ? (
          <AddRatingDialouge
            key={itemId}
            value={accountStates?.rated ? accountStates.rated.value : null}
            isSignedIn={accountStates ? true : false}
            icon={icon}
            id={id}
            type={isTvShow ? "tv" : "movie"}
          />
        ) : itemId == "list" ? (
          <AddToListDialouge
            key={itemId}
            isSignedIn={accountStates ? true : false}
            icon={icon}
            id={id}
            type={isTvShow ? "tv" : "movie"}
          />
        ) : (
          <li key={itemId}>
            <Button
              className={`text-gray-400 bg-transparent hover:bg-gray-600/40 hover:text-green-300 [&_svg]:size-5 ${
                itemId == "favorite" && isChecked ? "text-red-400" : ""
              }`}
              onClick={() => {
                handleAction(itemId);
              }}
            >
              {itemId == "favorite" || itemId == "watchlist"
                ? isChecked
                  ? trueIcon
                  : icon
                : null}
              {loadingAction == itemId && <Loader2 className="animate-spin" />}
            </Button>
          </li>
        )
      )}

      <li className="flex items-center gap-2 text-gray-400 hover:text-green-300 cursor-pointer">
        <Button
          className="bg-transparent hover:bg-gray-600/40 [&_svg]:size-5"
          variant={"ghost"}
        >
          <Play />
          <p className="">Play trailer</p>
        </Button>
      </li>
    </ul>
  );
};

export default MovieActions;
