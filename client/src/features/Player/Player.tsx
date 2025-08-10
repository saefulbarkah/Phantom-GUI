"use client";

import { FeatureCardSwitch } from "@/components/FeatureCard";
import { FeatureSlider } from "@/components/FeatureSlider";
import useFeatureManager from "@/stores/feature-manager";
import React from "react";

export const Player = () => {
  const { feature, OnUpdateFeature } = useFeatureManager();

  return (
    <section>
      {/* Player */}
      <div>
        <div className="mb-5">
          <h2 className="text-2xl font-semibold ">Player</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <FeatureCardSwitch
            title="Player Speed"
            description="lorem adma msd asd as das"
            defaultCheck={feature.PlayerSpeed}
            onSwitch={() => {
              OnUpdateFeature("PlayerSpeed");
            }}
          >
            <FeatureSlider
              defaultValue={feature.playerSpeedValue!}
              disabled={!feature.PlayerSpeed}
              maxValue={15}
              onValueChange={(e) => {
                OnUpdateFeature("playerSpeedValue", e);
              }}
            />
          </FeatureCardSwitch>

          <FeatureCardSwitch
            title="God Mode"
            description="lorem adma msd asd as das"
            defaultCheck={feature.GodMode}
            onSwitch={() => {
              OnUpdateFeature("GodMode");
            }}
          />

          <FeatureCardSwitch
            title="Auto Recover HP"
            description="lorem adma msd asd as das"
            defaultCheck={feature.AutoRecoverHP}
            onSwitch={() => {
              OnUpdateFeature("AutoRecoverHP");
            }}
          />

          <FeatureCardSwitch
            title="No Clip"
            description="lorem adma msd asd as das sad asd asda dasd das sda asdas as dasd asda sda d asdas das das das dasd  asdas das "
            defaultCheck={feature.NoClip}
            onSwitch={() => {
              OnUpdateFeature("NoClip");
            }}
          >
            <FeatureSlider
              defaultValue={feature.NoClipSpeed!}
              disabled={!feature.NoClip}
              maxValue={500}
              onValueChange={(e) => {
                OnUpdateFeature("NoClipSpeed", e);
              }}
            />
          </FeatureCardSwitch>

          <FeatureCardSwitch
            title="Perception Range"
            description="lorem adma msd asd as das"
            defaultCheck={feature.PerceptionRange}
            onSwitch={() => {
              OnUpdateFeature("PerceptionRange");
            }}
          />
        </div>
      </div>

      {/* Ability */}
      <div className="mt-10">
        <div className="mb-5">
          <h2 className="text-2xl font-semibold">Ability</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <FeatureCardSwitch
            title="Infinite Ultimate"
            description="lorem adma msd asd as das"
            defaultCheck={feature.InfiniteUltimate}
            onSwitch={() => {
              OnUpdateFeature("InfiniteUltimate");
            }}
          />

          <FeatureCardSwitch
            title="Infinite Forte"
            description="lorem adma msd asd as das"
            defaultCheck={feature.InfiniteForte}
            onSwitch={() => {
              OnUpdateFeature("InfiniteForte");
            }}
          />

          <FeatureCardSwitch
            title="Infinite Intro Outro"
            description="lorem adma msd asd as das"
            defaultCheck={feature.InfiniteIntroOutro}
            onSwitch={() => {
              OnUpdateFeature("InfiniteIntroOutro");
            }}
          />

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

      {/* Teleport */}
      <div className="mt-10">
        <div className="mb-5">
          <h2 className="text-2xl font-semibold">Teleport</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <FeatureCardSwitch
            title="Quest Teleport"
            description="lorem adma msd asd as das"
            defaultCheck={feature.QuestTp}
            onSwitch={() => {
              OnUpdateFeature("QuestTp");
            }}
          />

          <FeatureCardSwitch
            title="Mark Teleport"
            description="lorem adma msd asd as das"
            defaultCheck={feature.MarkTp}
            onSwitch={() => {
              OnUpdateFeature("MarkTp");
            }}
          />
        </div>
      </div>
    </section>
  );
};
