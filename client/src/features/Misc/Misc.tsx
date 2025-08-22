"use client";

import { UpdateEvent } from "@/API/Event";
import { FeatureCardSwitch } from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useFeatureManager } from "@/hooks/useFeatureManager";
import { Wheel } from "@uiw/react-color";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const Misc = () => {
  const [UIDColor, setUIDColor] = useState("#aabbcc");
  const [UID, setUid] = useState("");
  const { feature, OnUpdateFeature } = useFeatureManager();

  useEffect(() => {
    if (feature.UIDColor) setUIDColor(feature.UIDColor);
    if (feature.UID) setUid(feature.UID);
  }, [feature.UID, feature.UIDColor]);

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold ">Misc</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 items-start">
          <FeatureCardSwitch
            title="Show FPS"
            description="lorem adma msd asd as das"
            defaultCheck={feature.ShowFPS}
            onSwitch={() => {
              OnUpdateFeature("ShowFPS");
            }}
          />

          <FeatureCardSwitch
            title="Auto Claim Reward"
            description="lorem adma msd asd as das"
            defaultCheck={feature.AutoClaimReward}
            onSwitch={() => {
              OnUpdateFeature("AutoClaimReward");
            }}
          />

          <FeatureCardSwitch
            title="FPS Unlocker"
            description="lorem adma msd asd as das"
            defaultCheck={feature.FPSUnlocker}
            onSwitch={() => {
              OnUpdateFeature("FPSUnlocker");
            }}
          />

          <FeatureCardSwitch title="UID Changer" description="lorem adma msd asd as das">
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 items-center">
              <p>UID</p>
              <Input value={UID} onChange={(e) => setUid(e.currentTarget.value)} />

              <p>Color</p>
              <Popover>
                <PopoverTrigger className="h-8 rounded cursor-pointer" style={{ backgroundColor: UIDColor }}>
                  {UIDColor}
                </PopoverTrigger>
                <PopoverContent className="w-full p-2 rounded-full">
                  <Wheel color={UIDColor} onChange={(color) => setUIDColor(color.hex)} />
                </PopoverContent>
              </Popover>
            </div>
            <div className="mt-5 flex justify-end">
              <Button
                className="w-32"
                onClick={async () => {
                  await OnUpdateFeature("UID", UID);
                  await OnUpdateFeature("UIDColor", UIDColor);
                  await UpdateEvent({ onChangeUID: true });
                  toast.success("UID Changed");
                }}
              >
                Apply
              </Button>
            </div>
          </FeatureCardSwitch>

          <FeatureCardSwitch
            title="Randomize Color UID"
            description="lorem adma msd asd as das"
            defaultCheck={feature.UIDColorRandomize}
            onSwitch={() => {
              OnUpdateFeature("UIDColorRandomize");
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 mt-5">
        <h2 className="text-xl font-semibold">Treasure</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <FeatureCardSwitch
            title="Treasure Tracking"
            description="lorem adma msd asd as das"
            defaultCheck={feature.TreasureTracking}
            onSwitch={() => {
              OnUpdateFeature("TreasureTracking");
            }}
          />

          <FeatureCardSwitch
            title="Treasure Teleport Overlay"
            description="lorem adma msd asd as das"
            defaultCheck={feature.TreasureTpOverlay}
            onSwitch={() => {
              OnUpdateFeature("TreasureTpOverlay");
            }}
          />
        </div>
      </div>
    </section>
  );
};
