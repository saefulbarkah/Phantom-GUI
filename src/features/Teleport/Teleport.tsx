"use client";
import { FeatureCardSwitch } from "@/components/FeatureCard";
import { FeatureComboBox } from "@/components/FeatureComboBox";
import FeatureSection from "@/components/FeatureSection";
import FeatureWrapper from "@/components/FeatureWrapper";
import { KeybindInput } from "@/components/KeybindInput";
import { Button } from "@/components/ui/button";
import { useEventMutation } from "@/hooks/useEvent";
import { useKeybind } from "@/hooks/useKeybind";
import { useTeleport, useTeleportFile, useTeleportState } from "@/hooks/useTeleport";
import { RefreshCcw } from "lucide-react";
import React, { useEffect, useMemo } from "react";
import toast from "react-hot-toast";

export const Teleport = () => {
  const {
    IsLoopEnabled,
    IsAutoTeleport,
    SetAutoTeleport,
    SetLoopTeleport,
    fileName,
    SetFileName,
    targetName,
    SetTargetName,
    SetTeleportSelected,
    teleportSelected,
  } = useTeleportState();
  const { data: teleport, refetch: refetchTeleport } = useTeleportFile(fileName);
  const { query } = useTeleport();
  const { mutate: SendEvent } = useEventMutation();
  const { keybind, UpdateKeybind } = useKeybind();

  const teleports = useMemo(() => {
    return (
      query.data?.map((item) => ({
        label: item.name,
        value: item.filename,
        ...item,
      })) ?? []
    );
  }, [query.data]);

  const filterTeleports = useMemo(() => {
    return (
      teleport?.map((item) => ({
        label: item.name,
        value: `${item.id}`,
        data: { ...item },
      })) ?? []
    );
  }, [teleport]);

  const SendTeleport = (IsStart: boolean, type: "AUTO" | "MANUAL" | "LOOP") => {
    SendEvent({ onTeleport: { status: true, data: { enabled: IsStart, data: [], type: type } } });
  };

  useEffect(() => {
    if (teleport && teleport.length === 0) return;
    SendEvent({
      onTeleport: {
        status: true,
        data: {
          type: "BIND",
          data: teleport!,
          enabled: true,
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teleport]);

  return (
    <section>
      <FeatureWrapper>
        <div className="flex flex-col gap-5">
          <FeatureSection
            title="Custom Teleport"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, pariatur."
          >
            <FeatureCardSwitch>
              <div className="mt-3">
                <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 items-center mt-5">
                  <p>Select File</p>
                  <FeatureComboBox
                    data={teleports}
                    value={fileName}
                    setValue={(s) => SetFileName(s as string)}
                    onSelect={(d) => {
                      toast(`Filename selected ${d.filename}`);
                      SetTargetName(""); // auto reset when select filename
                    }}
                  />

                  <p>Select Target</p>
                  <FeatureComboBox
                    data={filterTeleports}
                    value={targetName}
                    setValue={(s) => SetTargetName(s as string)}
                    onSelect={(d) => {
                      SetTeleportSelected(d.data);
                    }}
                  />
                </div>
                <div className="flex gap-2 mt-5 w-full">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      SendEvent({
                        onTeleport: {
                          status: true,
                          data: { type: "MANUAL", data: [{ ...teleportSelected! }], enabled: true },
                        },
                      });
                    }}
                  >
                    Teleport
                  </Button>
                  <Button
                    size="icon"
                    className="flex-shrink-0"
                    onClick={() => {
                      query.refetch();
                      refetchTeleport();
                    }}
                  >
                    <RefreshCcw />
                  </Button>
                </div>
              </div>
            </FeatureCardSwitch>

            <FeatureCardSwitch
              title="Next Location"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, pariatur."
              RightContent={
                <div className="flex items-center gap-2">
                  <KeybindInput
                    keybind={keybind.NextTp.key}
                    onBind={(key) => {
                      UpdateKeybind({ action: "NextTp", key: key });
                    }}
                  />
                </div>
              }
            />

            <FeatureCardSwitch
              title="Previous Location"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, pariatur."
              RightContent={
                <div className="flex items-center gap-2">
                  <KeybindInput
                    keybind={keybind.PrevTp.key}
                    onBind={(key) => {
                      UpdateKeybind({ action: "PrevTp", key: key });
                    }}
                  />
                </div>
              }
            />

            <FeatureCardSwitch
              title="Auto Teleport"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, pariatur."
              defaultCheck={IsAutoTeleport}
              onSwitch={() => {
                SetAutoTeleport(!IsAutoTeleport);
                SendTeleport(!IsAutoTeleport, "AUTO");
              }}
            />

            <FeatureCardSwitch
              title="Loop Teleport"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, pariatur."
              defaultCheck={IsLoopEnabled}
              onSwitch={() => {
                SetLoopTeleport(!IsLoopEnabled);
                SendTeleport(!IsLoopEnabled, "LOOP");
              }}
            />
          </FeatureSection>
        </div>
      </FeatureWrapper>
    </section>
  );
};
