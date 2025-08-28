"use client";
import { FeatureCardSwitch } from "@/components/FeatureCard";
import FeatureSection from "@/components/FeatureSection";
import FeatureWrapper from "@/components/FeatureWrapper";
import { useFeatureManager } from "@/hooks/useFeatureManager";
import React from "react";

export const Visual = () => {
  const { feature, OnUpdateFeature } = useFeatureManager();

  return (
    <section>
      <FeatureWrapper>
        <FeatureSection title="Visuals">
          <FeatureCardSwitch
            title="Unlock All Skins"
            description="Unlock all outfits, weapons, gliders, avatars, cards, and sigils."
            defaultCheck={feature.UnlockSkin}
            onSwitch={() => {
              OnUpdateFeature("UnlockSkin");
            }}
          />
        </FeatureSection>
      </FeatureWrapper>
    </section>
  );
};
