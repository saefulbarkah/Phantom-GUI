"use client";
import { open } from "@tauri-apps/plugin-dialog";
import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TProps = {
  path: string;
  onSelect: (path: string) => void;
};

export const InputFile = ({ onSelect, className, path, ...props }: TProps & HTMLAttributes<HTMLDivElement>) => {
  const pick = async () => {
    const result = await open({
      multiple: false,
      filters: [{ name: "Executable", extensions: ["exe"] }],
    });

    if (typeof result === "string") {
      onSelect(result as string);
    }
  };

  return (
    <>
      <div
        className={cn("bg-[#0e1c29] w-full h-10 flex items-center relative cursor-pointer rounded", className)}
        onClick={() => {
          pick();
        }}
        {...props}
      >
        <p className="ml-2 mr-35 text-sm line-clamp-1">
          {path ? (
            <span>{path}</span>
          ) : (
            <span>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae asperiores, ea ad debitis maxime nulla
              suscipit earum? Et reprehenderit laudantium iste id impedit eum! Natus atque eum modi nulla porro?
            </span>
          )}
        </p>
        <button className="absolute right-0 top-0 bottom-0 bg-[#202d3a] px-2 text-sm rounded-r">Select File</button>
      </div>
    </>
  );
};
