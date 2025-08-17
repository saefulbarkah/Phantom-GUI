"use client";
import { FeatureCardSwitch } from "@/components/FeatureCard";
import { LoadingContent } from "@/components/LoadingContent";
import { useFeatureManager } from "@/hooks/useFeatureManager";
import React from "react";

export const Visual = () => {
  const { feature, OnUpdateFeature, IsFeatureReady } = useFeatureManager();

  if (!IsFeatureReady) return <LoadingContent />;

  return (
    <section className="flex flex-col gap-5">
      {/* Player */}
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold ">Visual</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <FeatureCardSwitch
            title="Unlock Skin"
            description="Unlock all skin including outfit, weapon, glide, avatar, card, sigil."
            defaultCheck={feature.UnlockSkin}
            onSwitch={() => {
              OnUpdateFeature("UnlockSkin");
            }}
          />
        </div>
      </div>
    </section>
  );
};
