import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Dialog,
  DialogClose,
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
import { getLists, updateListItems } from "@/lib/actions/user.actions";
import { Loader2 } from "lucide-react";
import Combobox from "./combobox";
import useClickOutside from "@/hooks/useClickOutside";

const AddToListDialouge = ({
  icon,
  isSignedIn,
  id,
  type,
  marginTop,
}: {
  icon: JSX.Element;
  isSignedIn: boolean;
  type: "movie" | "tv";
  id: string | number;
  marginTop?: boolean;
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [lists, setLists] = useState([]);
  const [listId, setListId] = useState<string | number>("");
  const [isOpen, setIsOpen] = useState(false);
  const getUserLists = async () => {
    setLoading(true);
    try {
      const Lists = await getLists();
      setLists(
        Lists?.results?.map(({ id, name }: { id: string; name: string }) => ({
          label: name,
          value: id,
        }))
      );
      console.log("Lists");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen && !isSignedIn) {
      toast({
        title: "You are not signed in",
        description: "You should be signed in to be able to do this",
        action: <ToastAction altText="Goto schedule to undo">OK</ToastAction>,
      });
      return;
    }
    if (isOpen) {
      getUserLists();
    }
  }, [isOpen]);
  const handleSubmit = async () => {
    if (!isSignedIn) {
      toast({
        title: "You are not signed in",
        description: "You should be signed in to be able to do this",
        action: <ToastAction altText="Goto schedule to undo">OK</ToastAction>,
      });
      return;
    }
    setLoading(false);
    if (!listId) return;
    const response = await updateListItems(listId, id, type);
    console.log(response);

    if (response?.success) {
      if (!response.results[0].success) {
        toast({
          title: "Item has already been taken",
          description: "You cant add it twice",
          action: (
            <ToastAction altText="Goto schedule to undo">OK!</ToastAction>
          ),
        });
        return;
      }
      toast({
        title: "Item added to your list",
        description: "You can view your lists in /user",
        action: <ToastAction altText="Goto schedule to undo">OK!</ToastAction>,
      });
    } else {
      toast({
        title: "Item was not added to your list",
        description: "Some error happended",
        action: <ToastAction altText="Goto schedule to undo">OK!</ToastAction>,
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
    if (!listId) return;
    const response = await updateListItems(listId, id, type, true);
    console.log(response);

    if (response?.success) {
      if (!response.results[0].success) {
        toast({
          title: "Item was not in the list",
          description: "You can view your list items in your profile page.",
          action: <ToastAction altText="Goto schedule to undo">OK</ToastAction>,
        });
        return;
      }
      toast({
        title: "Item removed from your list",
        description: "You can view your lists in /user",
        action: <ToastAction altText="Goto schedule to undo">OK!</ToastAction>,
      });
    } else {
      toast({
        title: "Item was not deleted to your list",
        description: "Some error happended",
        action: <ToastAction altText="Goto schedule to undo">OK!</ToastAction>,
      });
    }
  };
  const contentRef = useRef(null);
  useClickOutside(contentRef, () => setIsOpen(false));

  return (
    <Dialog
      open={isOpen}
      modal={marginTop ? false : true}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger
        className={`${
          marginTop ? "-mt-8 lg:-mt-0 lg:hidden" : ""
        } text-gray-400 bg-transparent hover:bg-gray-600/40 hover:text-green-300 [&_svg]:size-5 lg:py-2 lg:px-4 px-2 rounded-md shadow text-sm`}
        onClick={(e) => {
          setIsOpen(!isOpen);
          e.stopPropagation();
          e.preventDefault();
        }}
        asChild
      >
        <Button className="">
          {loading ? <Loader2 className="animate-spin" /> : icon}
        </Button>
      </DialogTrigger>
      <DialogContent
        ref={contentRef}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className="mb-3">Add or update your rating</DialogTitle>
          <DialogDescription className="flex flex-col"></DialogDescription>
          <div className="flex flex-col gap-3">
            <Combobox
              items={lists}
              dontShowValue
              changeFieldValue={(id: string | number) => setListId(id)}
            />
            <div className="flex gap-3">
              <DialogTrigger
                className="text-gray-400 hover:bg-gray-600/40 bg-gray-600/10 hover:text-green-300 [&_svg]:size-5 border rounded-md py-2 px-4"
                onClick={handleSubmit}
              >
                Submit
              </DialogTrigger>
              <DialogTrigger
                className="text-gray-400 hover:bg-red-400/40 bg-red-600/10 hover:text-red-300 [&_svg]:size-5 border rounded-md py-2 px-4"
                onClick={handleDelete}
              >
                Delete
              </DialogTrigger>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddToListDialouge;
