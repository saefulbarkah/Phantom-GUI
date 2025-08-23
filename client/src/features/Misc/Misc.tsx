"use client";

import { UpdateEvent } from "@/API/Event";
import { FeatureCardSwitch } from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useFeatureManager } from "@/hooks/useFeatureManager";
import { hexToRgba } from "@/lib/utils";
import { Wheel } from "@uiw/react-color";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDebounce } from "use-debounce";

export const Misc = () => {
  const [isInitial, setIsInitial] = useState(true);
  const [UIDColor, setUIDColor] = useState("#aabbcc");
  const [UID, setUid] = useState("");
  const { feature, OnUpdateFeature } = useFeatureManager();
  const [uidValue] = useDebounce(UID, 500);
  const [uidColorValue] = useDebounce(UIDColor, 500);

  const ChangeUID = async () => {
    try {
      await OnUpdateFeature("UID", UID);
      await OnUpdateFeature("UIDColor", UIDColor);
      await UpdateEvent({ onChangeUID: true });
    } catch (error) {
      console.error(error);
      toast.error("Failed to change UID");
    }
  };

  useEffect(() => {
    if (feature.UIDColor) setUIDColor(feature.UIDColor);
    if (feature.UID) setUid(feature.UID);
    if (feature.ShowFPS) UpdateEvent({ onShowFPS: true });
  }, [feature.UID, feature.UIDColor, feature.ShowFPS]);

  useEffect(() => {
    if (isInitial) {
      setIsInitial(false);
      return; // skip first render
    }
    ChangeUID();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uidValue, uidColorValue]);

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
              UpdateEvent({ onShowFPS: true });
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
              UpdateEvent({ onUnlockFPS: true });
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 mt-5">
        <h2 className="text-xl font-semibold">UID Changer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <FeatureCardSwitch title="Change UID" description="lorem adma msd asd as das">
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 items-center">
              <p>UID</p>
              <Input value={UID} onChange={(e) => setUid(e.currentTarget.value)} />
            </div>
          </FeatureCardSwitch>

          <FeatureCardSwitch title="Change Color" description="lorem adma msd asd as das">
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 items-center">
              <p>Color</p>
              <div className="min-w-0">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="w-full" style={{ backgroundColor: hexToRgba(UIDColor, 0.05) }}>
                      <span className="truncate" style={{ color: UIDColor }}>
                        {UID}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full rounded-full">
                    <Wheel color={UIDColor} onChange={(color) => setUIDColor(color.hex)} />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </FeatureCardSwitch>

          <FeatureCardSwitch
            title="Randomize Color"
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
              UpdateEvent({ onTreasureTpOverlayTrigger: true });
            }}
          />
        </div>
      </div>
    </section>
  );
};
