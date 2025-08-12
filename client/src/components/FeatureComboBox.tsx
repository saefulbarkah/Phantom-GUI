"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type TOptionValue = { label: string; value: string };

type TFeatureComboBox<T> = {
  data: T[];
  onSelect?: (val: T) => void;
};

export function FeatureComboBox<T extends TOptionValue>({ data, onSelect }: TFeatureComboBox<T>) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="w-full
         justify-between bg-[#0e1c29] hover:bg-[#0e1c29]/90"
        >
          <span className="truncate">
            {value ? data.find((item) => item.value === value)?.label : "Select item..."}
          </span>
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[--radix-popover-trigger-width] p-0 border-none rounded-2xl">
        <Command className="text-slate-200 border-none bg-[#0e1c29]/100">
          <CommandInput className="border-none" placeholder="Search item..." />
          <CommandList className="border-none">
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  className="border-none"
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                    if (onSelect) {
                      onSelect(item);
                    }
                  }}
                >
                  <CheckIcon className={cn("mr-2 h-4 w-4", value === item.value ? "opacity-100" : "opacity-0")} />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
