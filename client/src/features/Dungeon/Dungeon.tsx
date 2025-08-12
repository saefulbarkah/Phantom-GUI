"use client";

import { EnterDungeon } from "@/API/dungeons";
import { FeatureCardSwitch } from "@/components/FeatureCard";
import { FeatureComboBox } from "@/components/FeatureComboBox";
import { LoadingContent } from "@/components/LoadingContent";
import { Button } from "@/components/ui/button";
import { useFeatureManager } from "@/hooks/useFeatureManager";
import { TDungeon } from "@/types/dungeon";
import { useMutation } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDungeons } from "../../hooks/useDungeons";

export const Dungeon = () => {
  const [dungeon, SetDungeon] = useState<TDungeon | null>(null);
  const { feature, OnUpdateFeature, IsFeatureReady } = useFeatureManager();
  const { dungeons, isSuccess, isFetching, refetch } = useDungeons();

  const { mutate } = useMutation({
    mutationFn: EnterDungeon,
    onSuccess: (_, t) => {
      toast.success(`Enter dungeon ${t.name}`);
    },
  });

  if (!IsFeatureReady || !isSuccess) return <LoadingContent />;

  return (
    <section className="flex flex-col gap-5">
      {/* Player */}
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold ">Enter Dungeon</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <FeatureCardSwitch title="Select Dungeon" description="">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 min-w-0">
                  <FeatureComboBox
                    data={dungeons.map((item, index) => ({
                      label: item.name,
                      value: `${item.name + index}`,
                      real_value: item.id,
                    }))}
                    onSelect={(val) => {
                      toast(`Dungeon selected id ${val.real_value}`);
                      SetDungeon({ id: val.real_value, name: val.label });
                    }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => {
                      if (dungeon) {
                        mutate(dungeon);
                      } else {
                        toast.error("Please select dungeon");
                      }
                    }}
                  >
                    Enter
                  </Button>
                  <Button
                    onClick={() => {
                      refetch().then(() => {
                        toast.success("Dungeon Refreshed");
                      });
                    }}
                    disabled={isFetching}
                  >
                    <RefreshCcw className={`${isFetching ? "animate-spin" : ""}`} />
                  </Button>
                </div>
              </div>
            </div>
          </FeatureCardSwitch>

          <FeatureCardSwitch
            title="Skip Entrance"
            description="Quick enter dungeon when you turn on."
            defaultCheck={feature.SkipEntranceDungeon}
            onSwitch={() => {
              OnUpdateFeature("SkipEntranceDungeon");
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 mt-5">
        <h2 className="text-xl font-semibold ">Dungeon</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <FeatureCardSwitch
            title="Auto Restart Dungeon"
            description="Automatically restart dungeon when instance finish."
            defaultCheck={feature.AutoRestartDungeon}
            onSwitch={() => {
              OnUpdateFeature("AutoRestartDungeon");
            }}
          />
          <FeatureCardSwitch
            title="Auto Start Challenge"
            description="Automatically start challenge in dungeon."
            defaultCheck={feature.AutoChallengeBoss}
            onSwitch={() => {
              OnUpdateFeature("AutoChallengeBoss");
            }}
          />

          <FeatureCardSwitch
            title="Auto Claim Reward"
            description="Automatically claim reward in dungeon, and check your power if not enough will ignore it."
            defaultCheck={feature.AutoClaimRewardDungeon}
            onSwitch={() => {
              OnUpdateFeature("AutoClaimRewardDungeon");
            }}
          />
        </div>
      </div>
    </section>
  );
};
