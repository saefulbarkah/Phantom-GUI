"use client";

import { FeatureCardSwitch } from "@/components/FeatureCard";
import { FeatureSlider } from "@/components/FeatureSlider";
import { useEventMutation } from "@/hooks/useEvent";
import { useFeatureManager } from "@/hooks/useFeatureManager";
import React from "react";
import toast from "react-hot-toast";

export const Player = () => {
  const { feature, OnUpdateFeature } = useFeatureManager();
  const { mutate: SendEvent } = useEventMutation();

  return (
    <section className="flex flex-col gap-5">
      {/* Player */}
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold ">Player</h2>
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
      <div className="flex flex-col gap-5 mt-5">
        <h2 className="text-xl font-semibold">Ability</h2>
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

          <FeatureCardSwitch
            title="Flight Mode"
            description="lorem adma msd asd as das"
            defaultCheck={feature.flightMode}
            onSwitch={() => {
              OnUpdateFeature("flightMode");
            }}
            WithKeybind={true}
            OnBind={(data) => {
              SendEvent({
                onKeybindChanged: {
                  status: true,
                  data: {
                    key: data,
                    action: "Flight",
                  },
                },
              });
              toast.success("Keybind: " + data);
            }}
          />
        </div>
      </div>

      {/* Teleport */}
      <div className="flex flex-col gap-5 mt-5">
        <h2 className="text-xl font-semibold">Teleport</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <FeatureCardSwitch
            title="Quest Teleport"
            description="lorem adma msd asd as das"
            defaultCheck={feature.QuestTp}
            onSwitch={() => {
              OnUpdateFeature("QuestTp");
            }}
            WithKeybind={true}
            OnBind={(data) => {
              SendEvent({
                onKeybindChanged: {
                  status: true,
                  data: {
                    key: data,
                    action: "QuestTp",
                  },
                },
              });
              toast.success("Keybind: " + data);
            }}
          />

          <FeatureCardSwitch
            title="Mark Teleport"
            description="lorem adma msd asd as das"
            defaultCheck={feature.MarkTp}
            onSwitch={() => {
              OnUpdateFeature("MarkTp");
            }}
            WithKeybind={true}
            OnBind={(data) => {
              SendEvent({
                onKeybindChanged: {
                  status: true,
                  data: {
                    key: data,
                    action: "MarkTp",
                  },
                },
              });
              toast.success("Keybind: " + data);
            }}
          />
        </div>
      </div>
    </section>
  );
};
