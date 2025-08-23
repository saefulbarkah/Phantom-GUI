"use client";

import { FeatureCardSwitch } from "@/components/FeatureCard";
import { FeatureSlider } from "@/components/FeatureSlider";
import { Switch } from "@/components/ui/switch";
import { useFeatureManager } from "@/hooks/useFeatureManager";
import { Dot } from "lucide-react";
import React from "react";

export const World = () => {
  const { feature, OnUpdateFeature } = useFeatureManager();

  return (
    <section className="flex flex-col gap-5">
      {/* Player */}
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold ">World</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <FeatureCardSwitch
            title="World Speed"
            description="lorem adma msd asd as das"
            defaultCheck={feature.WorldSpeed}
            onSwitch={() => {
              OnUpdateFeature("WorldSpeed");
            }}
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
            title="Kill Animal"
            description="lorem adma msd asd as das"
            defaultCheck={feature.KillAnimal}
            onSwitch={() => {
              OnUpdateFeature("KillAnimal");
            }}
          />

          <FeatureCardSwitch
            title="Enable Plot Skip"
            description="lorem adma msd asd as das sad asd asda dasd das sda asdas as dasd asda sda d asdas das das das dasd  asdas das "
            defaultCheck={feature.PlotSkip}
            onSwitch={() => {
              OnUpdateFeature("PlotSkip");
            }}
          />

          <FeatureCardSwitch
            title="Mob Vacuum"
            description="lorem adma msd asd as das"
            defaultCheck={feature.MobVacuum}
            onSwitch={() => {
              OnUpdateFeature("MobVacuum");
            }}
          />

          <FeatureCardSwitch
            title="Collect Vacuum"
            description="lorem adma msd asd as das"
            defaultCheck={feature.VacuumCollect}
            onSwitch={() => {
              OnUpdateFeature("VacuumCollect");
            }}
          />
        </div>
      </div>

      {/* Player */}
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold ">Kill Aura</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <FeatureCardSwitch
            title="Enable Kill Aura"
            description="lorem adma msd asd as das"
            warningInfo={<p>Avoid use this in quest</p>}
            defaultCheck={feature.killAura}
            onSwitch={() => {
              OnUpdateFeature("killAura");
            }}
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
            description="Damage over time to enemy"
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
            description="Instant kill enemy"
            defaultCheck={feature.isInstantKillAura}
            onSwitch={() => {
              if (feature.isDotKillAura) {
                OnUpdateFeature("isDotKillAura", false);
              }

              OnUpdateFeature("isInstantKillAura");
            }}
          />
        </div>
      </div>

      {/* Ability */}
      <div className="flex flex-col gap-5 mt-5">
        <h2 className="text-xl font-semibold">Auto Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <FeatureCardSwitch
            title="Auto Absorb"
            description="lorem adma msd asd as das"
            defaultCheck={feature.AutoAbsorb}
            onSwitch={() => {
              OnUpdateFeature("AutoAbsorb");
            }}
          />

          <FeatureCardSwitch
            title="Auto Loot"
            description="lorem adma msd asd as das"
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
            description="lorem adma msd asd as das"
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
            description="lorem adma msd asd as das"
            defaultCheck={feature.AutoSkipPlot}
            onSwitch={() => {
              OnUpdateFeature("AutoSkipPlot");
            }}
          />

          <FeatureCardSwitch
            title="Semi Auto Quest"
            description="lorem adma msd asd as das"
            defaultCheck={feature.AutoQuest}
            onSwitch={() => {
              OnUpdateFeature("AutoQuest");
            }}
          />

          <FeatureCardSwitch
            title="Auto Open Teleport"
            description="lorem adma msd asd as das"
            defaultCheck={feature.AutoOpenTeleports}
            onSwitch={() => {
              OnUpdateFeature("AutoOpenTeleports");
            }}
          />

          <FeatureCardSwitch
            title="Auto Sonance Casket"
            description="lorem adma msd asd as das"
            defaultCheck={feature.AutoDodge}
            onSwitch={() => {
              OnUpdateFeature("AutoDodge");
            }}
          />

          <FeatureCardSwitch
            title="Auto Solve Puzzle"
            description="Automatically solve some puzzle"
            defaultCheck={feature.AutoParry}
            onSwitch={() => {
              OnUpdateFeature("AutoParry");
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
            description="lorem adma msd asd as das"
            defaultCheck={feature.AutoDestroy}
            onSwitch={() => {
              OnUpdateFeature("AutoDestroy");
            }}
          />
        </div>
      </div>
    </section>
  );
};
