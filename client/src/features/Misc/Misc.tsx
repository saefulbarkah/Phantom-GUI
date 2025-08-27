"use client";

import { UpdateEvent } from "@/API/Event";
import { FeatureCardSwitch } from "@/components/FeatureCard";
import FeatureSection from "@/components/FeatureSection";
import FeatureWrapper from "@/components/FeatureWrapper";
import { KeybindInput } from "@/components/KeybindInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useFeatureManager } from "@/hooks/useFeatureManager";
import { useKeybind } from "@/hooks/useKeybind";
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
  const { keybind, UpdateKeybind } = useKeybind();

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
              description="Show current FPS on screen"
              defaultCheck={feature.ShowFPS}
              onSwitch={() => {
                OnUpdateFeature("ShowFPS");
                UpdateEvent({ onShowFPS: { status: true } });
              }}
            />

            <FeatureCardSwitch
              title="Auto-Claim Reward"
              description="Auto claim available rewards"
              defaultCheck={feature.AutoClaimReward}
              onSwitch={() => {
                OnUpdateFeature("AutoClaimReward");
              }}
              Info={
                <div className="flex flex-col gap-2">
                  <h2>Only works on:</h2>
                  <p>- Daily activitiy</p>
                  <p>- Chapter Activity</p>
                  <p>- Trophies</p>
                </div>
              }
            />

            <FeatureCardSwitch
              title="Unlock FPS"
              description="Remove FPS cap for smoother play"
              defaultCheck={feature.FPSUnlocker}
              onSwitch={() => {
                OnUpdateFeature("FPSUnlocker");
                UpdateEvent({ onUnlockFPS: { status: true, data: { IsEnabled: !feature.FPSUnlocker } } });
              }}
            />
          </FeatureSection>

          <FeatureSection title="Treasure">
            <FeatureCardSwitch
              title="Treasure Tracker"
              description="Highlight treasures on map"
              defaultCheck={feature.TreasureTracking}
              onSwitch={() => {
                OnUpdateFeature("TreasureTracking");
              }}
            />

            <FeatureCardSwitch
              title="Treasure Teleport"
              description="Teleport to treasures via overlay"
              defaultCheck={feature.TreasureTpOverlay}
              onSwitch={() => {
                OnUpdateFeature("TreasureTpOverlay");
                UpdateEvent({
                  onTreasureTpOverlayTrigger: { status: true, data: { IsEnabled: !feature.TreasureTpOverlay } },
                });
              }}
            />
          </FeatureSection>
        </div>

        <div className="flex flex-col gap-5">
          <FeatureSection title="UID">
            <FeatureCardSwitch title="Custom UID" description="Set custom UID to display">
              <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 items-center">
                <p>UID</p>
                <Input value={UID} onChange={(e) => setUid(e.currentTarget.value)} />
              </div>
            </FeatureCardSwitch>

            <FeatureCardSwitch title="UID Color" description="Set custom color for UID">
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
              title="Random UID Color"
              description="Randomize UID color automatically"
              defaultCheck={feature.UIDColorRandomize}
              onSwitch={() => {
                OnUpdateFeature("UIDColorRandomize");
              }}
            />
          </FeatureSection>

          <FeatureSection title="Game Settings">
            <FeatureCardSwitch
              title="Freeze Time"
              description="Pause in-game time"
              defaultCheck={feature.ShowFPS}
              onSwitch={() => {
                OnUpdateFeature("FreezeGameTime");
              }}
              RightContent={
                <KeybindInput
                  keybind={keybind.FreezeGameTime.key}
                  onBind={(key) => UpdateKeybind({ action: "FreezeGameTime", key: key })}
                />
              }
            />
            <FeatureCardSwitch
              title="Copy Coordinates"
              description="Copy player coordinates to clipboard"
              RightContent={
                <div className="flex items-center gap-2">
                  <KeybindInput
                    keybind={keybind.CopyTpCordinate.key}
                    onBind={(key) => UpdateKeybind({ action: "CopyTpCordinate", key: key })}
                  />
                  <Button>Copy</Button>
                </div>
              }
            />
          </FeatureSection>
        </div>
      </FeatureWrapper>
    </section>
  );
};
