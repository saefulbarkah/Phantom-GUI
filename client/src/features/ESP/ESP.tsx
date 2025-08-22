"use client";

import { FeatureCardSwitch } from "@/components/FeatureCard";
import { FeatureSlider } from "@/components/FeatureSlider";
import { useFeatureManager } from "@/hooks/useFeatureManager";
import React from "react";

export const ESP = () => {
  const { feature, OnUpdateFeature } = useFeatureManager();

  return (
    <section className="flex flex-col gap-5">
      {/* Player */}
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold ">ESP</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <FeatureCardSwitch
            title="ESP"
            description="lorem adma msd asd as das"
            defaultCheck={feature.ESP}
            onSwitch={() => {
              OnUpdateFeature("ESP");
            }}
          >
            <FeatureSlider
              defaultValue={feature.ESPRadius!}
              disabled={!feature.ESP}
              maxValue={500}
              onValueChange={(e) => {
                OnUpdateFeature("ESPRadius", e);
              }}
            />
          </FeatureCardSwitch>

          <FeatureCardSwitch
            title="Show Name"
            description="lorem adma msd asd as das"
            defaultCheck={feature.ShowName}
            onSwitch={() => {
              OnUpdateFeature("ShowName");
            }}
          />

          <FeatureCardSwitch
            title="Show Distance"
            description="lorem adma msd asd as das"
            defaultCheck={feature.ShowDistance}
            onSwitch={() => {
              OnUpdateFeature("ShowDistance");
            }}
          />

          <FeatureCardSwitch
            title="Show Box"
            description="lorem adma msd asd as das"
            defaultCheck={feature.ShowBox}
            onSwitch={() => {
              OnUpdateFeature("ShowBox");
            }}
          />
        </div>
      </div>

      {/* Ability */}
      <div className="flex flex-col gap-5 mt-5">
        <h2 className="text-xl font-semibold">ESP Filter</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <FeatureCardSwitch
            title="Animal"
            description="lorem adma msd asd as das"
            defaultCheck={feature.ShowAnimal}
            onSwitch={() => {
              OnUpdateFeature("ShowAnimal");
            }}
          />

          <FeatureCardSwitch
            title="Blobify"
            description="lorem adma msd asd as das"
            defaultCheck={feature.ShowBlobfly}
            onSwitch={() => {
              OnUpdateFeature("ShowBlobfly");
            }}
          />

          <FeatureCardSwitch
            title="Monster"
            description="lorem adma msd asd as das"
            defaultCheck={feature.ShowMonster}
            onSwitch={() => {
              OnUpdateFeature("ShowMonster");
            }}
          />

          <FeatureCardSwitch
            title="Collection"
            description="lorem adma msd asd as das"
            defaultCheck={feature.ShowCollect}
            onSwitch={() => {
              OnUpdateFeature("ShowCollect");
            }}
          />

          <FeatureCardSwitch
            title="Treasure"
            description="lorem adma msd asd as das"
            defaultCheck={feature.ShowTreasure}
            onSwitch={() => {
              OnUpdateFeature("ShowTreasure");
            }}
          />

          <FeatureCardSwitch
            title="Puzzle"
            description="lorem adma msd asd as das"
            defaultCheck={feature.ShowPuzzle}
            onSwitch={() => {
              OnUpdateFeature("ShowPuzzle");
            }}
          />

          <FeatureCardSwitch
            title="Casket"
            description="lorem adma msd asd as das"
            defaultCheck={feature.ShowCasket}
            onSwitch={() => {
              OnUpdateFeature("ShowCasket");
            }}
          />

          <FeatureCardSwitch
            title="Rock"
            description="lorem adma msd asd as das"
            defaultCheck={feature.ShowRock}
            onSwitch={() => {
              OnUpdateFeature("ShowRock");
            }}
          />

          <FeatureCardSwitch
            title="Mutterfly"
            description="lorem adma msd asd as das"
            defaultCheck={feature.ShowMutterfly}
            onSwitch={() => {
              OnUpdateFeature("ShowMutterfly");
            }}
          />
        </div>
      </div>
    </section>
  );
};
