"use client";

import { FeatureCardSwitch } from "@/components/FeatureCard";
import { FeatureSlider } from "@/components/FeatureSlider";
import { LoadingContent } from "@/components/LoadingContent";
import { useFeatureManager } from "@/hooks/useFeatureManager";
import React from "react";

export const World = () => {
  const { feature, OnUpdateFeature, IsFeatureReady } = useFeatureManager();

  if (!IsFeatureReady) return <LoadingContent />;

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
            title="Kill Aura"
            description="lorem adma msd asd as das"
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
            title="Infinite Stamina"
            description="lorem adma msd asd as das"
            defaultCheck={feature.InfiniteStamina}
            onSwitch={() => {
              OnUpdateFeature("InfiniteStamina");
            }}
          />

          <FeatureCardSwitch
            title="No Cooldown"
            description="lorem adma msd asd as das"
            defaultCheck={feature.NoCD}
            onSwitch={() => {
              OnUpdateFeature("NoCD");
            }}
          />

          <FeatureCardSwitch
            title="Auto Dodge"
            description="lorem adma msd asd as das"
            defaultCheck={feature.AutoDodge}
            onSwitch={() => {
              OnUpdateFeature("AutoDodge");
            }}
          />

          <FeatureCardSwitch
            title="Auto Parry"
            description="lorem adma msd asd as das"
            defaultCheck={feature.AutoParry}
            onSwitch={() => {
              OnUpdateFeature("AutoParry");
            }}
          />

          <FeatureCardSwitch
            title="Walk On Water"
            description="lorem adma msd asd as das"
            defaultCheck={feature.WalkOnwater}
            onSwitch={() => {
              OnUpdateFeature("WalkOnwater");
            }}
          />
        </div>
      </div>
    </section>
  );
};
