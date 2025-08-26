"use client";

import { UpdateEvent } from "@/API/Event";
import { FeatureCardSwitch } from "@/components/FeatureCard";
import FeatureSection from "@/components/FeatureSection";
import { FeatureSlider } from "@/components/FeatureSlider";
import FeatureWrapper from "@/components/FeatureWrapper";
import { useFeatureManager } from "@/hooks/useFeatureManager";
import React from "react";

export const ESP = () => {
  const { feature, OnUpdateFeature } = useFeatureManager();

  const triggerESPUpdate = () => {
    UpdateEvent({ onESPTrigger: { status: true } });
  };

  return (
    <section>
      <FeatureWrapper>
        <FeatureSection title="ESP Options">
          <FeatureCardSwitch
            title="Enable ESP"
            description="Toggle ESP (Extra Sensory Perception) to visualize entities in the world"
            defaultCheck={feature.ESP}
            onSwitch={() => {
              OnUpdateFeature("ESP");
              triggerESPUpdate();
            }}
          >
            <FeatureSlider
              defaultValue={feature.ESPRadius!}
              disabled={!feature.ESP}
              maxValue={500}
              onValueChange={(e) => {
                OnUpdateFeature("ESPRadius", e);
                triggerESPUpdate();
              }}
            />
          </FeatureCardSwitch>

          <FeatureCardSwitch
            title="Show Name"
            description="Display entity names above them"
            defaultCheck={feature.ShowName}
            onSwitch={() => {
              OnUpdateFeature("ShowName");
              triggerESPUpdate();
            }}
          />

          <FeatureCardSwitch
            title="Show Distance"
            description="Show the distance from your character to the entity"
            defaultCheck={feature.ShowDistance}
            onSwitch={() => {
              OnUpdateFeature("ShowDistance");
              triggerESPUpdate();
            }}
          />

          <FeatureCardSwitch
            title="Show Box"
            description="Draw a box around entities for easier tracking"
            defaultCheck={feature.ShowBox}
            onSwitch={() => {
              OnUpdateFeature("ShowBox");
              triggerESPUpdate();
            }}
          />

          <FeatureCardSwitch
            title="Debug Entity"
            description="Display debug information for entities"
            defaultCheck={feature.DebugEntity}
            onSwitch={() => {
              OnUpdateFeature("DebugEntity");
              triggerESPUpdate();
            }}
          />
        </FeatureSection>

        <FeatureSection title="ESP Filters">
          <FeatureCardSwitch
            title="Animals"
            description="Display animals in ESP"
            defaultCheck={feature.ShowAnimal}
            onSwitch={() => {
              OnUpdateFeature("ShowAnimal");
              triggerESPUpdate();
            }}
          />

          <FeatureCardSwitch
            title="Blobfly"
            description="Display Blobfly creatures in ESP"
            defaultCheck={feature.ShowBlobfly}
            onSwitch={() => {
              OnUpdateFeature("ShowBlobfly");
              triggerESPUpdate();
            }}
          />

          <FeatureCardSwitch
            title="Monsters"
            description="Display monsters in ESP"
            defaultCheck={feature.ShowMonster}
            onSwitch={() => {
              OnUpdateFeature("ShowMonster");
              triggerESPUpdate();
            }}
          />

          <FeatureCardSwitch
            title="Collections"
            description="Display collectible items in ESP"
            defaultCheck={feature.ShowCollect}
            onSwitch={() => {
              OnUpdateFeature("ShowCollect");
              triggerESPUpdate();
            }}
          />

          <FeatureCardSwitch
            title="Treasure"
            description="Display treasure chests in ESP"
            defaultCheck={feature.ShowTreasure}
            onSwitch={() => {
              OnUpdateFeature("ShowTreasure");
              triggerESPUpdate();
            }}
          />

          <FeatureCardSwitch
            title="Puzzles"
            description="Display puzzle objects in ESP"
            defaultCheck={feature.ShowPuzzle}
            onSwitch={() => {
              OnUpdateFeature("ShowPuzzle");
              triggerESPUpdate();
            }}
          />

          <FeatureCardSwitch
            title="Caskets"
            description="Display caskets in ESP"
            defaultCheck={feature.ShowCasket}
            onSwitch={() => {
              OnUpdateFeature("ShowCasket");
              triggerESPUpdate();
            }}
          />

          <FeatureCardSwitch
            title="Rocks"
            description="Display rocks in ESP"
            defaultCheck={feature.ShowRock}
            onSwitch={() => {
              OnUpdateFeature("ShowRock");
              triggerESPUpdate();
            }}
          />

          <FeatureCardSwitch
            title="Butterflies"
            description="Display butterflies in ESP"
            defaultCheck={feature.ShowMutterfly}
            onSwitch={() => {
              OnUpdateFeature("ShowMutterfly");
              triggerESPUpdate();
            }}
          />
        </FeatureSection>
      </FeatureWrapper>
    </section>
  );
};
