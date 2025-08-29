"use client";
import { FeatureCardSwitch } from "@/components/FeatureCard";
import { FeatureComboBox } from "@/components/FeatureComboBox";
import FeatureSection from "@/components/FeatureSection";
import FeatureWrapper from "@/components/FeatureWrapper";
import { KeybindInput } from "@/components/KeybindInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEventMutation } from "@/hooks/useEvent";
import { useKeybind } from "@/hooks/useKeybind";
import { useTeleport, useTeleportFile, useTeleportState } from "@/hooks/useTeleport";
import { RefreshCcw } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
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
  const [jsonFile, setJsonFile] = useState<{ filename?: string | null; content?: string | null }>({
    content: null,
    filename: null,
  });
  const importFile = useRef<HTMLInputElement>(null);

  const teleports = useMemo(() => {
    return (
      query.data
        ?.map((item) => ({
          label: item.name,
          value: item.filename,
          ...item,
        }))
        .sort((a, b) => a.name.localeCompare(b.name)) ?? []
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

  const SendTeleport = (enabled: boolean, type: "AUTO" | "MANUAL" | "LOOP") => {
    SendEvent({
      onTeleport: {
        status: true,
        data: { enabled, data: [], type },
      },
    });
  };

  const handleImportJSONChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate extension
      if (!file.name.endsWith(".json")) {
        toast.error("File must be in JSON format!");
        return;
      }

      // Optional: Validate MIME type
      if (file.type !== "application/json") {
        toast.error("File is not JSON!");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const parsed = JSON.parse(content);
          setJsonFile({ content: JSON.stringify(parsed), filename: file.name });
          console.log(parsed);
        } catch (error) {
          console.error(error);
        }
      };

      reader.readAsText(file);
    }
  };

  const UploadJSON = async () => {
    try {
      if (!jsonFile.filename || !jsonFile.content) return;
      console.log(jsonFile);
      await invoke("write_file", {
        name: "resources/teleport/" + jsonFile.filename,
        content: jsonFile.content,
      });
      toast.success("JSON Saved!");
    } catch (err) {
      toast.error("Failed to save JSON: " + err);
    }
  };

  useEffect(() => {
    if (!teleport || teleport.length === 0) return;
    SendEvent({
      onTeleport: {
        status: true,
        data: {
          type: "BIND",
          data: teleport,
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
            title="Teleport Manager"
            description="Manage teleport files and locations easily for fast travel."
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
                      toast(`File selected: ${d.filename}`);
                      SetTargetName(""); // reset when selecting a new file
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
                      if (!teleportSelected) {
                        toast.error("Please select a teleport target first");
                        return;
                      }
                      SendEvent({
                        onTeleport: {
                          status: true,
                          data: {
                            type: "MANUAL",
                            data: [{ ...teleportSelected }],
                            enabled: true,
                          },
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
                      toast.success("Teleport data refreshed");
                    }}
                  >
                    <RefreshCcw />
                  </Button>
                </div>
              </div>
            </FeatureCardSwitch>
          </FeatureSection>

          <FeatureSection title="Teleport Importer">
            <FeatureCardSwitch>
              <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 items-center">
                <p>Json File: </p>
                <div className="min-w-0">
                  <Button
                    className="w-full"
                    onClick={() => {
                      if (!importFile.current) return;
                      importFile.current.click();
                    }}
                  >
                    <span className="truncate">{jsonFile.filename ? jsonFile.filename : "Upload file"}</span>
                  </Button>
                  <Input
                    className="hidden sr-only absolute inset-0"
                    type="file"
                    ref={importFile}
                    onChange={handleImportJSONChange}
                    accept=".json,application/json" // hanya JSON
                  />
                </div>
              </div>
              <div className="flex items-center mt-5 justify-end">
                <Button onClick={() => UploadJSON()}>Import</Button>
              </div>
            </FeatureCardSwitch>
          </FeatureSection>
        </div>

        <FeatureSection title="Teleport Actions">
          <FeatureCardSwitch
            title="Next Teleport"
            description="Use a hotkey to jump to the next teleport target."
            RightContent={
              <div className="flex items-center gap-2">
                <KeybindInput
                  keybind={keybind.NextTp.key}
                  onBind={(key) => {
                    UpdateKeybind({ action: "NextTp", key });
                  }}
                />
              </div>
            }
          />

          <FeatureCardSwitch
            title="Previous Teleport"
            description="Use a hotkey to go back to the previous teleport target."
            RightContent={
              <div className="flex items-center gap-2">
                <KeybindInput
                  keybind={keybind.PrevTp.key}
                  onBind={(key) => {
                    UpdateKeybind({ action: "PrevTp", key });
                  }}
                />
              </div>
            }
          />

          <FeatureCardSwitch
            title="Auto Teleport"
            description="Enable automatic teleport."
            defaultCheck={IsAutoTeleport}
            onSwitch={() => {
              SetAutoTeleport(!IsAutoTeleport);
              SendTeleport(!IsAutoTeleport, "AUTO");
            }}
          />

          <FeatureCardSwitch
            title="Loop Teleport"
            description="Enable continuous loop teleport between targets."
            defaultCheck={IsLoopEnabled}
            onSwitch={() => {
              SetLoopTeleport(!IsLoopEnabled);
              SendTeleport(!IsLoopEnabled, "LOOP");
            }}
          />
        </FeatureSection>
      </FeatureWrapper>
    </section>
  );
};
