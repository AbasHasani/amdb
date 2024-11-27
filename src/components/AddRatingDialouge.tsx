import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "./ui/toast";
import { addRating } from "@/lib/actions/user.actions";
import { Loader2 } from "lucide-react";

const AddRatingDialouge = ({
  icon,
  value,
  isSignedIn,
  id,
  type,
}: {
  icon: JSX.Element;
  value: number | null;
  isSignedIn: boolean;
  type: "movie" | "tv";
  id: string | number;
}) => {
  const [rating, setRating] = useState<number | string>("");
  const { toast } = useToast();
  const [roundedRating, setRoundedRating] = useState(0);
  const [accountRating, setAccountRating] = useState<null | number>(value);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setAccountRating(value);
  }, [value]);
  useEffect(() => {
    if (!rating) {
      setRoundedRating(0);
      return;
    }
    //@ts-ignore
    setRoundedRating(Math.round(parseFloat(rating) * 2) / 2);
  }, [rating]);
  const handleSubmit = async () => {
    if (!isSignedIn) {
      toast({
        title: "You are not signed in",
        description: "You should be signed in to be able to do this",
        action: <ToastAction altText="Goto schedule to undo">OK</ToastAction>,
      });
      return;
    }
    if (!rating) {
      toast({
        title: "You should enter a value",
        description:
          "You should Enter a value from 0 to 10 which is a multiple of 0.5",
        action: <ToastAction altText="Goto schedule to undo">OK</ToastAction>,
      });
      return;
    }
    setLoading(true);
    //@ts-ignore
    const response = await addRating(id, parseFloat(rating), type, false);
    setLoading(false);
    if (response?.success) {
      //@ts-ignore
      setAccountRating(() => parseFloat(rating));
    } else {
      toast({
        title: "Your request failed",
        action: <ToastAction altText="Goto schedule to undo">OK</ToastAction>,
      });
    }
  };

  const handleDelete = async () => {
    if (!isSignedIn) {
      toast({
        title: "You are not signed in",
        description: "You should be signed in to be able to do this",
        action: <ToastAction altText="Goto schedule to undo">OK</ToastAction>,
      });
      return;
    }
    setLoading(true);
    //@ts-ignore
    const response = await addRating(id, parseFloat(rating), type, true);
    setLoading(false);
    if (response?.success) {
      //@ts-ignore
      setAccountRating(null);
    } else {
      toast({
        title: "Your request failed",
        action: <ToastAction altText="Goto schedule to undo">OK</ToastAction>,
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger
        className="text-gray-400 bg-transparent hover:bg-gray-600/40 hover:text-green-300 [&_svg]:size-5 py-2 px-4 rounded-md shadow text-sm"
      >
        {loading ? <Loader2 className="animate-spin" /> : accountRating || icon}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-3">Add or update your rating</DialogTitle>
          <DialogDescription className="flex flex-col">
            <span>
              The number should be a multiple of 0.5 and not more than 10
            </span>
            <span>Current nearest to 0.5: {roundedRating}</span>
          </DialogDescription>
          <div className="flex gap-3 items-center">
            <Input
              placeholder="7.5"
              value={rating}
              className="rounded-md py-2 px-4 border"
              onChange={(e) => {
                const value = e.target.value;
                if (
                  //@ts-ignore
                  (!isNaN(value) && !isNaN(parseFloat(value))) ||
                  value == ""
                ) {
                  if (parseFloat(value) <= 10 || value == "") {
                    setRating(value);
                  }
                }
              }}
              autoFocus
            />
            <DialogTrigger
              className="text-gray-400 hover:bg-gray-600/40 bg-gray-600/10 hover:text-green-300 [&_svg]:size-5 border rounded-md py-2 px-4"
              onClick={handleSubmit}
            >
              Submit
            </DialogTrigger>
            {accountRating && (
              <DialogTrigger
                className="text-gray-400 hover:bg-red-400/40 bg-red-600/10 hover:text-red-300 [&_svg]:size-5 border rounded-md py-2 px-4"
                onClick={handleDelete}
              >
                Delete
              </DialogTrigger>
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddRatingDialouge;
