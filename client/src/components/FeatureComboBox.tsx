"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type TFeatureComboBox = {
  data: { label: string; value: string; real_value: string | number }[];
  onSelect?: (val: string | number) => void;
};

export function FeatureComboBox({ data, onSelect }: TFeatureComboBox) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="w-full rounded-md">
          <Button role="combobox" aria-expanded={open} className="w-full h-full justify-between">
            {value ? data.find((item) => item.value === value)?.label : "Select item..."}
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="lg:w-[var(--radix-popover-trigger-width)] w-full p-0 border-none rounded-2xl">
        <Command className="text-slate-200 border-none">
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
                      onSelect(item.real_value);
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
