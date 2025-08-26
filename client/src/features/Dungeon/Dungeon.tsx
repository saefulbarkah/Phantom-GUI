"use client";

import { FeatureCardSwitch } from "@/components/FeatureCard";
import { FeatureComboBox } from "@/components/FeatureComboBox";
import { Button } from "@/components/ui/button";
import { useFeatureManager } from "@/hooks/useFeatureManager";
import { TDungeon } from "@/types/dungeon";
import { RefreshCcw } from "lucide-react";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDungeons } from "../../hooks/useDungeons";
import { useEventMutation } from "@/hooks/useEvent";
import FeatureWrapper from "@/components/FeatureWrapper";
import FeatureSection from "@/components/FeatureSection";

export const Dungeon = () => {
  const [dungeon, SetDungeon] = useState<TDungeon | null>(null);
  const { feature, OnUpdateFeature } = useFeatureManager();
  const { dungeons, isFetching, refetch } = useDungeons();
  const [dungeonValue, setDungeonValue] = useState("");
  const { mutate } = useEventMutation();

  const dungeonOptions = useMemo(() => {
    return (
      dungeons?.map((item, index) => ({
        label: item.name,
        value: `${item.name + index}`,
        real_value: item.id,
      })) ?? []
    );
  }, [dungeons]);

  return (
    <section>
      <FeatureWrapper>
        <FeatureSection title="Dungeon Automation">
          <FeatureCardSwitch
            title="Auto Restart"
            description="Restart dungeon automatically."
            defaultCheck={feature.AutoRestartDungeon}
            onSwitch={() => {
              OnUpdateFeature("AutoRestartDungeon");
            }}
          />
          <FeatureCardSwitch
            title="Auto Challenge"
            description="Start dungeon challenge automatically."
            defaultCheck={feature.AutoChallengeBoss}
            onSwitch={() => {
              OnUpdateFeature("AutoChallengeBoss");
            }}
          />

          <FeatureCardSwitch
            title="Auto Claim Reward"
            description="Claim dungeon reward automatically."
            defaultCheck={feature.AutoClaimRewardDungeon}
            onSwitch={() => {
              OnUpdateFeature("AutoClaimRewardDungeon");
            }}
          />
        </FeatureSection>

        <FeatureSection title="Dungeon Entry">
          <FeatureCardSwitch title="Select Dungeon" description="">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 min-w-0">
                  <FeatureComboBox
                    data={dungeonOptions}
                    value={dungeonValue}
                    setValue={setDungeonValue}
                    onSelect={(val) => {
                      SetDungeon({ id: val.real_value, name: val.label });
                    }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => {
                      if (dungeon) {
                        mutate({
                          onEnterDungeon: {
                            status: true,
                            data: { dungeonId: dungeon.id, SkipEntrance: feature.SkipEntranceDungeon as boolean },
                          },
                        });
                        toast.success(`Enter dungeon ${dungeon.name}`);
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
            description="Enter dungeon instantly."
            defaultCheck={feature.SkipEntranceDungeon}
            onSwitch={() => {
              OnUpdateFeature("SkipEntranceDungeon");
            }}
          />
        </FeatureSection>
      </FeatureWrapper>
    </section>
  );
};
