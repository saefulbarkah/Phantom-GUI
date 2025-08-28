"use client";

import * as React from "react";
import { ChevronsUpDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Image from "next/image";

export type TOptionValue = { label: string; value: string; icon?: string };

type TFeatureComboBox<T> = {
  data: T[];
  onSelect?: (val: T) => void;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
};

export function FeatureComboBox<T extends TOptionValue>({
  data,
  onSelect,
  value,
  setValue,
  disabled = false,
}: TFeatureComboBox<T>) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
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
        <Command className="text-slate-200 border-none bg-[#0e1c29]">
          <CommandInput className="border-none" placeholder="Search item..." />
          <CommandList className="border-none">
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {data.map((item, i) => (
                <CommandItem
                  className={`border-none ${item.value === value ? "bg-[#202e3a]" : ""}`}
                  key={`${item.value}-${i}`}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                    if (onSelect) {
                      onSelect(item);
                    }
                  }}
                >
                  {item.icon ? <Image width={20} height={20} src={item.icon} alt={item.value} /> : null}
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
