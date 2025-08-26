"use client";

import { UpdateEvent } from "@/API/Event";
import { FeatureCardSwitch } from "@/components/FeatureCard";
import FeatureSection from "@/components/FeatureSection";
import FeatureWrapper from "@/components/FeatureWrapper";
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
      await UpdateEvent({
        onChangeUID: {
          status: true,
          data: { uid: UID, color: UIDColor },
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to change UID");
    }
  };

  useEffect(() => {
    if (feature.UIDColor) setUIDColor(feature.UIDColor);
    if (feature.UID) setUid(feature.UID);
    if (feature.ShowFPS) UpdateEvent({ onShowFPS: { status: true } });
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
    <section>
      <FeatureWrapper>
        <div className="flex flex-col gap-5">
          <FeatureSection title="Misc">
            <FeatureCardSwitch
              title="Show FPS"
              description="Display your current frames per second on screen"
              defaultCheck={feature.ShowFPS}
              onSwitch={() => {
                OnUpdateFeature("ShowFPS");
                UpdateEvent({ onShowFPS: { status: true } });
              }}
            />

            <FeatureCardSwitch
              title="Auto Claim Reward"
              description="Automatically claim available rewards in-game"
              defaultCheck={feature.AutoClaimReward}
              onSwitch={() => {
                OnUpdateFeature("AutoClaimReward");
              }}
            />

            <FeatureCardSwitch
              title="FPS Unlocker"
              description="Unlock FPS cap to increase performance"
              defaultCheck={feature.FPSUnlocker}
              onSwitch={() => {
                OnUpdateFeature("FPSUnlocker");
                UpdateEvent({ onUnlockFPS: { status: true } });
              }}
            />
          </FeatureSection>

          <FeatureSection title="Treasure Features">
            <FeatureCardSwitch
              title="Treasure Tracking"
              description="Highlight and track treasures in the world"
              defaultCheck={feature.TreasureTracking}
              onSwitch={() => {
                OnUpdateFeature("TreasureTracking");
              }}
            />

            <FeatureCardSwitch
              title="Treasure Teleport Overlay"
              description="Enable overlay to teleport directly to treasures"
              defaultCheck={feature.TreasureTpOverlay}
              onSwitch={() => {
                OnUpdateFeature("TreasureTpOverlay");
                UpdateEvent({ onTreasureTpOverlayTrigger: { status: true } });
              }}
            />
          </FeatureSection>
        </div>

        <FeatureSection title="UID Options">
          <FeatureCardSwitch title="Change UID" description="Set a custom UID to display in-game">
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 items-center">
              <p>UID</p>
              <Input value={UID} onChange={(e) => setUid(e.currentTarget.value)} />
            </div>
          </FeatureCardSwitch>

          <FeatureCardSwitch title="Change UID Color" description="Customize the color of your UID display">
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
            title="Randomize UID Color"
            description="Automatically randomize your UID color periodically"
            defaultCheck={feature.UIDColorRandomize}
            onSwitch={() => {
              OnUpdateFeature("UIDColorRandomize");
            }}
          />
        </FeatureSection>
      </FeatureWrapper>
    </section>
  );
};
