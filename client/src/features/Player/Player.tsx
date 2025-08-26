"use client";

import { FeatureCardSwitch } from "@/components/FeatureCard";
import FeatureSection from "@/components/FeatureSection";
import { FeatureSlider } from "@/components/FeatureSlider";
import FeatureWrapper from "@/components/FeatureWrapper";
import { KeybindInput } from "@/components/KeybindInput";
import { useFeatureManager } from "@/hooks/useFeatureManager";
import { useKeybind } from "@/hooks/useKeybind";
import React from "react";

export const Player = () => {
  const { feature, OnUpdateFeature } = useFeatureManager();
  const { keybind, UpdateKeybind } = useKeybind();

  return (
    <section>
      <FeatureWrapper>
        <FeatureSection title="Player Settings">
          <FeatureCardSwitch
            title="Player Speed"
            description="Adjust player movement speed."
            defaultCheck={feature.PlayerSpeed}
            onSwitch={() => {
              OnUpdateFeature("PlayerSpeed");
            }}
            RightContent={
              <KeybindInput
                keybind={keybind.PlayerSpeed.key}
                onBind={(key) => UpdateKeybind({ action: "PlayerSpeed", key: key })}
              />
            }
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
            description="Become invincible."
            defaultCheck={feature.GodMode}
            onSwitch={() => {
              OnUpdateFeature("GodMode");
            }}
          />

          <FeatureCardSwitch
            title="Auto Recover HP"
            description="Auto heal when HP is low."
            defaultCheck={feature.AutoRecoverHP}
            onSwitch={() => {
              OnUpdateFeature("AutoRecoverHP");
            }}
          />

          <FeatureCardSwitch
            title="No Clip"
            description="Pass through walls/objects."
            defaultCheck={feature.NoClip}
            onSwitch={() => {
              OnUpdateFeature("NoClip");
            }}
            RightContent={
              <KeybindInput
                keybind={keybind.NoClip.key}
                onBind={(key) => UpdateKeybind({ action: "NoClip", key: key })}
              />
            }
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
            description="Increase detection range."
            defaultCheck={feature.PerceptionRange}
            onSwitch={() => {
              OnUpdateFeature("PerceptionRange");
            }}
          />

          <FeatureCardSwitch
            title="Quest Teleport"
            description="Teleport to quest target."
            defaultCheck={feature.QuestTp}
            onSwitch={() => {
              OnUpdateFeature("QuestTp");
            }}
            RightContent={
              <KeybindInput
                keybind={keybind.QuestTp.key}
                onBind={(key) => UpdateKeybind({ action: "QuestTp", key: key })}
              />
            }
          />

          <FeatureCardSwitch
            title="Mark Teleport"
            description="Teleport to marked spot."
            defaultCheck={feature.MarkTp}
            onSwitch={() => {
              OnUpdateFeature("MarkTp");
            }}
            RightContent={
              <KeybindInput
                keybind={keybind.MarkTp.key}
                onBind={(key) => UpdateKeybind({ action: "MarkTp", key: key })}
              />
            }
          />
        </FeatureSection>

        <FeatureSection title="Abilities">
          <FeatureCardSwitch
            title="Infinite Ultimate"
            description="Unlimited ultimate usage."
            defaultCheck={feature.InfiniteUltimate}
            onSwitch={() => {
              OnUpdateFeature("InfiniteUltimate");
            }}
          />

          <FeatureCardSwitch
            title="Infinite Forte"
            description="Unlimited Forte skill."
            defaultCheck={feature.InfiniteForte}
            onSwitch={() => {
              OnUpdateFeature("InfiniteForte");
            }}
          />

          <FeatureCardSwitch
            title="Infinite Intro Outro"
            description="Loop intro/outro skills."
            defaultCheck={feature.InfiniteIntroOutro}
            onSwitch={() => {
              OnUpdateFeature("InfiniteIntroOutro");
            }}
          />

          <FeatureCardSwitch
            title="Infinite Stamina"
            description="No stamina consumption."
            defaultCheck={feature.InfiniteStamina}
            onSwitch={() => {
              OnUpdateFeature("InfiniteStamina");
            }}
          />

          <FeatureCardSwitch
            title="No Cooldown"
            description="Skills have no cooldown."
            defaultCheck={feature.NoCD}
            onSwitch={() => {
              OnUpdateFeature("NoCD");
            }}
          />

          <FeatureCardSwitch
            title="Auto Dodge"
            description="Automatically dodge attacks."
            defaultCheck={feature.AutoDodge}
            onSwitch={() => {
              OnUpdateFeature("AutoDodge");
            }}
          />

          <FeatureCardSwitch
            title="Auto Parry"
            description="Automatically parry attacks."
            defaultCheck={feature.AutoParry}
            onSwitch={() => {
              OnUpdateFeature("AutoParry");
            }}
          />

          <FeatureCardSwitch
            title="Walk On Water"
            description="Walk on water surface."
            defaultCheck={feature.WalkOnwater}
            onSwitch={() => {
              OnUpdateFeature("WalkOnwater");
            }}
          />

          <FeatureCardSwitch
            title="Flight Mode"
            description="Enable flying"
            defaultCheck={feature.flightMode}
            onSwitch={() => {
              OnUpdateFeature("flightMode");
            }}
            RightContent={
              <KeybindInput
                keybind={keybind.MarkTp.key}
                onBind={(key) => UpdateKeybind({ action: "MarkTp", key: key })}
              />
            }
          />
        </FeatureSection>
      </FeatureWrapper>
    </section>
  );
};
