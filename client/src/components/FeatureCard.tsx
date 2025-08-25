"use client";

import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Switch } from "./ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { CircleAlert } from "lucide-react";
import { KeybindInput } from "./KeybindInput";

type TFeatureCard = React.ComponentProps<"div"> & {
  title: string;
  description: string;
  onSwitch?: React.MouseEventHandler<HTMLButtonElement>;
  defaultCheck?: boolean;
  warningInfo?: React.ReactNode;
  Info?: React.ReactNode;
  WithKeybind?: boolean;
  OnBind?: (e: string) => void;
  disabled?: boolean;
};

export const FeatureCardSwitch = ({
  title,
  description,
  defaultCheck = false,
  onSwitch,
  children,
  warningInfo,
  Info,
  WithKeybind = false,
  OnBind,
  disabled = false,
}: TFeatureCard) => {
  return (
    <Card className="rounded-md bg-box/50 backdrop-blur-sm text-slate-100 border-none">
      <CardContent>
        <div className="flex gap-5 w-full transition">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-2">
              <h2 className="leading-none font-semibold">{title}</h2>
              <div className="flex items-center gap-2">
                {warningInfo ? (
                  <Tooltip>
                    <TooltipTrigger>
                      <CircleAlert className="w-4.5 h-4.5 text-red-400" />
                    </TooltipTrigger>
                    <TooltipContent className="p-2.5 text-start">{warningInfo}</TooltipContent>
                  </Tooltip>
                ) : null}
                {Info ? (
                  <Tooltip>
                    <TooltipTrigger>
                      <CircleAlert className="w-4.5 h-4.5 text-slate-300" />
                    </TooltipTrigger>
                    <TooltipContent className="p-2.5 flex items-center justify-start">{Info}</TooltipContent>
                  </Tooltip>
                ) : null}
              </div>
            </div>
            <p className="text-sm font-normal text-slate-300/80 line-clamp-2 hover:line-clamp-none">{description}</p>
          </div>
          {onSwitch ? (
            <Switch
              disabled={disabled}
              onClick={onSwitch}
              checked={disabled ? false : defaultCheck}
              variant={"destructive"}
            />
          ) : null}
        </div>
        {children ? <div className="mt-5">{children}</div> : null}
      </CardContent>
      {WithKeybind ? (
        <CardFooter className="mt-auto">
          <div className="flex items-center gap-2">
            <p className="text-sm">Keybind</p>
            <KeybindInput onBind={OnBind} />
          </div>
        </CardFooter>
      ) : null}
    </Card>
  );
};
