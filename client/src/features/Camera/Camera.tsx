"use client";

import { FeatureCardSwitch } from "@/components/FeatureCard";
import { FeatureSlider } from "@/components/FeatureSlider";
import { useEventMutation } from "@/hooks/useEvent";
import { useFeatureManager } from "@/hooks/useFeatureManager";
import React, { useEffect } from "react";
import { useDebounce } from "use-debounce";

export const Camera = () => {
  const { feature, OnUpdateFeature } = useFeatureManager();
  const UpdateEvent = useEventMutation();
  const [fovValue] = useDebounce(feature.FovValue, 500);

  useEffect(() => {
    UpdateEvent.mutate({ onFOVChanged: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fovValue]);

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold ">Camera</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <FeatureCardSwitch
            title="FOV Changer"
            description="lorem adma msd asd as das"
            defaultCheck={feature.IsFovEnable}
            onSwitch={() => {
              OnUpdateFeature("IsFovEnable");
              UpdateEvent.mutate({ onFOVChanged: true });
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
            title="Anti Dither"
            description="lorem adma msd asd as das"
            defaultCheck={feature.AntiDither}
            onSwitch={() => {
              OnUpdateFeature("AntiDither");
            }}
          />

          <FeatureCardSwitch
            title="FIrst Person Mode"
            description="lorem adma msd asd as das"
            defaultCheck={feature.FirstPersonMode}
            onSwitch={() => {
              OnUpdateFeature("FirstPersonMode");
            }}
          />
        </div>
      </div>
    </section>
  );
};
