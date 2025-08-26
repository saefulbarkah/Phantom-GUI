"use client";
import { useWindowEvent } from "@/hooks/useWindowEvent";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { SaveIcon } from "lucide-react";
import { SaveSettings } from "@/API/settings";
import toast from "react-hot-toast";
import { SaveKeybinds } from "@/API/Keybind";
import { SaveBuffConfig } from "@/API/buffs";

export const Navbar = () => {
  const { appWindow, ref } = useWindowEvent();

  return (
    <nav className={`fixed top-0 right-0 left-0 bg-background border-b h-18 border-b-slate-400/15 z-50 select-none`}>
      <div className="flex items-center h-full mx-[25px]">
        <div className="flex gap-2 items-center">
          <Image
            src={"./assets/icon/k-logo.png"}
            alt=""
            width={512}
            height={512}
            style={{ width: "50px", height: "50px" }}
          />
          <h2 className="text-lg font-bold">Phantom Waves</h2>
        </div>
        <div className={`flex-1 h-full hover:cursor-grab`} ref={ref} />
        <div className="flex items-center gap-5">
          <Button
            onClick={() => {
              SaveSettings();
              SaveKeybinds();
              SaveBuffConfig();
              toast.success("Config saved");
            }}
          >
            <SaveIcon />
          </Button>
          <div className="flex items-center justify-center gap-2 drag">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="bg-yellow-500 w-4 h-4 rounded-full p-0 hover:bg-yellow-400"
                  onClick={() => {
                    appWindow().minimize();
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>Minimize</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="bg-green-500 w-4 h-4 rounded-full p-0 hover:bg-green-400 relative"
                  onClick={() => {
                    appWindow().toggleMaximize();
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>Maximize</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </nav>
  );
};
