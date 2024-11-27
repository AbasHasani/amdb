"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UseFormSetValue } from "react-hook-form";

const Combobox: React.FC<{
  items: { value: string | number ; label: string }[];
  title?: string;
  field?: string | number;
  fieldName?:
    | "type"
    | "language"
    | "with_genres"
    | "rating"
    | "primary_release_year"
    | "with_origin_country";
  changeFieldValue?:
    | UseFormSetValue<{
        type: "movie" | "tv";
        language?: string | undefined;
        with_genres?: string | undefined;
        rating?: string | undefined;
        primary_release_year?: string | undefined;
        with_origin_country?: string | undefined;
      }>
    | ((id: string | number) => void);
  dontShowValue?: boolean;
  dontStrech?: boolean;
}> = ({ items, title, field, changeFieldValue, fieldName, dontShowValue, dontStrech }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string | number>("");

  React.useEffect(() => {
    !field && setValue("");
    !field && fieldName && changeFieldValue && changeFieldValue(fieldName, "");
  }, [items]);
  return (
    <div className="flex flex-col" data-combobox onFocus={() => console.log('Combobox focused')}
    onBlur={() => console.log('Combobox blurred')}>
      {!field && title ? (
        <h3 className="text-gray-400 italic font-light">{title}:</h3>
      ) : null}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`${!dontStrech ? 'min-w-[230px]' : "w-full"} justify-between`}
          >
            {value || field
              ? items.find((item) => item.value == (value || field))?.label ||
                "Select item..."
              : "Select item..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput className="w-full" placeholder="Search item..." />
            <CommandList className="">
              <CommandEmpty>No item found.</CommandEmpty>
              <CommandGroup className="w-full">
                {items.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value.toString()}
                    className="w-full"
                    onSelect={() => {
                      !fieldName &&
                        setValue(() =>
                          item.value === value ? "" : item.value!
                        );
                      setOpen(false);
                      if (changeFieldValue && fieldName) {
                        changeFieldValue(fieldName, item.value!.toString());
                        return;
                      }
                      if (changeFieldValue) {
                        //@ts-ignore
                        changeFieldValue(item.value);
                      }
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        (value || field) === item.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {item.label} {!dontShowValue ? `- ${item.value}` : null}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Combobox;
