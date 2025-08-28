"use client";

import { FeatureCardSwitch } from "@/components/FeatureCard";
import FeatureSection from "@/components/FeatureSection";
import { FeatureSlider } from "@/components/FeatureSlider";
import FeatureWrapper from "@/components/FeatureWrapper";
import { useEventMutation } from "@/hooks/useEvent";
import { useFeatureManager } from "@/hooks/useFeatureManager";
import React, { useEffect } from "react";
import { useDebounce } from "use-debounce";

export const Camera = () => {
  const { feature, OnUpdateFeature } = useFeatureManager();
  const UpdateEvent = useEventMutation();
  const [fovValue] = useDebounce(feature.FovValue, 500);

  useEffect(() => {
    if (feature.IsFovEnable) UpdateEvent.mutate({ onFOVChanged: { status: true, data: { fov: Number(fovValue) } } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fovValue, feature.IsFovEnable]);

  return (
    <section>
      <FeatureWrapper>
        <FeatureSection title="Camera Settings">
          <FeatureCardSwitch
            title="FOV Changer"
            description="Adjust the camera's field of view for a wider or narrower perspective"
            defaultCheck={feature.IsFovEnable}
            onSwitch={() => {
              OnUpdateFeature("IsFovEnable");
            }}
          >
            <FeatureSlider
              defaultValue={feature.FovValue!}
              disabled={!feature.IsFovEnable}
              maxValue={200}
              onValueChange={(e) => {
                OnUpdateFeature("FovValue", e);
              }}
            />
          </FeatureCardSwitch>

          <FeatureCardSwitch
            title="Anti-Dither"
            description="Prevent dithering effects for a smoother visual experience"
            defaultCheck={feature.AntiDither}
            onSwitch={() => {
              OnUpdateFeature("AntiDither");
            }}
          />

          <FeatureCardSwitch
            title="First Person Mode"
            description="Switch the camera to first-person perspective"
            defaultCheck={feature.FirstPersonMode}
            onSwitch={() => {
              OnUpdateFeature("FirstPersonMode");
            }}
          />
        </FeatureSection>
      </FeatureWrapper>
    </section>
  );
};
