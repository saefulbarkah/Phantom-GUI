"use client";

import { FeatureCardSwitch } from "@/components/FeatureCard";
import FeatureSection from "@/components/FeatureSection";
import { FeatureSlider } from "@/components/FeatureSlider";
import FeatureWrapper from "@/components/FeatureWrapper";
import { KeybindInput } from "@/components/KeybindInput";
import { useEventMutation } from "@/hooks/useEvent";
import { useFeatureManager } from "@/hooks/useFeatureManager";
import { useKeybind } from "@/hooks/useKeybind";
import { Dot } from "lucide-react";
import React from "react";

export const World = () => {
  const { feature, OnUpdateFeature } = useFeatureManager();
  const { UpdateKeybind, keybind } = useKeybind();
  const { mutate: UpdateEvent } = useEventMutation();

  return (
    <section>
      <FeatureWrapper>
        <div className="flex flex-col gap-5">
          <FeatureSection title="World">
            <FeatureCardSwitch
              title="World Speed"
              description="Adjust world speed."
              defaultCheck={feature.WorldSpeed}
              onSwitch={() => {
                OnUpdateFeature("WorldSpeed");
                UpdateEvent({
                  onWorldSpeedChanged: { status: true, data: { IsEnabled: !feature.WorldSpeed } },
                });
              }}
              RightContent={
                <KeybindInput
                  keybind={keybind.WorldSpeed.key}
                  onBind={(key) => UpdateKeybind({ action: "WorldSpeed", key: key })}
                />
              }
            >
              <FeatureSlider
                defaultValue={feature.WorldSpeedValue!}
                disabled={!feature.WorldSpeed}
                maxValue={15}
                onValueChange={(e) => {
                  OnUpdateFeature("WorldSpeedValue", e);
                }}
              />
            </FeatureCardSwitch>

            <FeatureCardSwitch
              title="Auto Kill Animal"
              description="Enable instant kills."
              defaultCheck={feature.KillAnimal}
              onSwitch={() => {
                OnUpdateFeature("KillAnimal");
              }}
            />

            <FeatureCardSwitch
              title="Enable Plot Skip"
              description="Skip story plot."
              defaultCheck={feature.PlotSkip}
              onSwitch={() => {
                OnUpdateFeature("PlotSkip");
              }}
            />

            <FeatureCardSwitch
              title="Mob Vacuum"
              description="Pull mobs automatically."
              defaultCheck={feature.MobVacuum}
              onSwitch={() => {
                OnUpdateFeature("MobVacuum");
              }}
              RightContent={
                <KeybindInput
                  keybind={keybind.MobVacuum.key}
                  onBind={(key) => UpdateKeybind({ action: "MobVacuum", key: key })}
                />
              }
            />

            <FeatureCardSwitch
              title="Collect Vacuum"
              description="Collect items automatically."
              defaultCheck={feature.VacuumCollect}
              onSwitch={() => {
                OnUpdateFeature("VacuumCollect");
              }}
            />
          </FeatureSection>

          <FeatureSection title="Combat Features">
            <FeatureCardSwitch
              title="Enable Kill Aura"
              description="Attack nearby enemies."
              warningInfo={<p>Avoid use this in quest</p>}
              defaultCheck={feature.killAura}
              onSwitch={() => {
                OnUpdateFeature("killAura");
              }}
              RightContent={
                <KeybindInput
                  keybind={keybind.KillAura.key}
                  onBind={(key) => UpdateKeybind({ action: "KillAura", key: key })}
                />
              }
            >
              <FeatureSlider
                defaultValue={feature.killAuraRadius!}
                disabled={!feature.killAura}
                maxValue={100}
                onValueChange={(e) => {
                  OnUpdateFeature("killAuraRadius", e);
                }}
              />
            </FeatureCardSwitch>

            <FeatureCardSwitch
              disabled={!feature.killAura}
              title="Damage Over Time"
              description="Apply DOT effect."
              defaultCheck={feature.isDotKillAura}
              onSwitch={() => {
                if (feature.isInstantKillAura) {
                  OnUpdateFeature("isInstantKillAura", false);
                }

                OnUpdateFeature("isDotKillAura");
              }}
            />

            <FeatureCardSwitch
              title="Instant Kill"
              disabled={!feature.killAura}
              description="Kill instantly."
              defaultCheck={feature.isInstantKillAura}
              onSwitch={() => {
                if (feature.isDotKillAura) {
                  OnUpdateFeature("isDotKillAura", false);
                }

                OnUpdateFeature("isInstantKillAura");
              }}
            />
          </FeatureSection>
        </div>

        <FeatureSection title="Automation Features">
          <FeatureCardSwitch
            title="Auto Absorb"
            description="Absorb items automatically."
            defaultCheck={feature.AutoAbsorb}
            onSwitch={() => {
              OnUpdateFeature("AutoAbsorb");
            }}
          />

          <FeatureCardSwitch
            title="Auto Loot"
            description="Automatically loot items."
            defaultCheck={feature.AutoLoot}
            onSwitch={() => {
              OnUpdateFeature("AutoLoot");
            }}
          >
            <FeatureSlider
              defaultValue={feature.AutoLootDistance!}
              disabled={!feature.AutoLoot}
              maxValue={100}
              onValueChange={(e) => {
                OnUpdateFeature("AutoLootDistance", e);
              }}
            />
          </FeatureCardSwitch>

          <FeatureCardSwitch
            title="Auto Pick Treasure"
            description="Automatically pick treasures."
            defaultCheck={feature.AutoPickTreasure}
            onSwitch={() => {
              OnUpdateFeature("AutoPickTreasure");
            }}
          >
            <FeatureSlider
              defaultValue={feature.AutoTreasureDistance!}
              disabled={!feature.AutoPickTreasure}
              maxValue={100}
              onValueChange={(e) => {
                OnUpdateFeature("AutoTreasureDistance", e);
              }}
            />
          </FeatureCardSwitch>

          <FeatureCardSwitch
            title="Auto Plot Skip"
            description="Skip plots automatically."
            defaultCheck={feature.AutoSkipPlot}
            onSwitch={() => {
              OnUpdateFeature("AutoSkipPlot");
            }}
          />

          <FeatureCardSwitch
            title="Semi Auto Quest"
            description="Assist quest automatically."
            defaultCheck={feature.AutoQuest}
            onSwitch={() => {
              OnUpdateFeature("AutoQuest");
            }}
            RightContent={
              <KeybindInput
                keybind={keybind.SkipQuestNode.key}
                onBind={(key) => UpdateKeybind({ action: "SkipQuestNode", key: key })}
              />
            }
          />

          <FeatureCardSwitch
            title="Auto Open Teleport"
            description="Open teleports automatically."
            defaultCheck={feature.AutoOpenTeleports}
            onSwitch={() => {
              OnUpdateFeature("AutoOpenTeleports");
            }}
          />

          <FeatureCardSwitch
            title="Auto Sonance Casket"
            description="Open caskets automatically."
            defaultCheck={feature.AutoSonanceCasket}
            onSwitch={() => {
              OnUpdateFeature("AutoSonanceCasket");
            }}
          />

          <FeatureCardSwitch
            title="Auto Solve Puzzle"
            description="Solve puzzles automatically."
            defaultCheck={feature.AutoPuzzle}
            onSwitch={() => {
              OnUpdateFeature("AutoPuzzle");
            }}
            Info={
              <div className="flex flex-col gap-1">
                <div className="">
                  <h2>Automatically solve puzzle</h2>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <Dot />
                    <p>Overflowing palette</p>
                  </div>
                  <div className="flex items-center">
                    <Dot />
                    <p>Signal Device</p>
                  </div>
                  <div className="flex items-center">
                    <Dot />
                    <p>Cipher</p>
                  </div>
                  <div className="flex items-center">
                    <Dot />
                    <p>Melody Orchestration</p>
                  </div>
                  <div className="flex items-center">
                    <Dot />
                    <p>Treasure Slots</p>
                  </div>
                </div>
              </div>
            }
          />

          <FeatureCardSwitch
            title="Auto Mining"
            description="Mine/destroy blocks automatically."
            defaultCheck={feature.AutoDestroy}
            onSwitch={() => {
              OnUpdateFeature("AutoDestroy");
            }}
          />
        </FeatureSection>
      </FeatureWrapper>
    </section>
  );
};
