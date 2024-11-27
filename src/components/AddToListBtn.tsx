import React, { useEffect, useState } from "react";
import {
    DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { List } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { getLists, updateListItems } from "@/lib/actions/user.actions";
import { ToastAction } from "./ui/toast";
import { useToast } from "@/hooks/use-toast";

const AddToListBtn = ({
  setRatingValue,
  setIsRatingOpen,
  setIsListOpen,
  id,
  type,
}: {
  setRatingValue: any;
  setIsRatingOpen: any;
  setIsListOpen: any;
  id: string | number;
  type: "movie" | "tv";
}) => {
  const [listItems, setListItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [label, setLabel] = useState("");
  const { toast } = useToast();
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
    open ? getUserLists() : null;
  }, [open]);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        onClick={() => {
          setRatingValue("");
          setIsRatingOpen(false);
          setIsListOpen((prev: any) => !prev);
          setOpen(true);
        }}
        className="lg:hidden cursor-pointer"
      >
        <List />
        Add to list
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-2 p-0">
        <Command>
          <CommandInput placeholder="Filter label..." autoFocus={true} />
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
                    const response = await updateListItems(value, id, type);
                    if (response?.success) {
                      toast({
                        title: "item added",
                        description: `Your added the item to ${currentValue}`,
                        action: <ToastAction altText="Undo">OK</ToastAction>,
                      });
                    } else {
                      toast({
                        variant: "destructive",
                        title: "Adding to list failed",
                        description: `Some error happended`,
                        action: <ToastAction altText="Undo">OK</ToastAction>,
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddToListBtn;
