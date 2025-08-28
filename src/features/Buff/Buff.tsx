"use client";

import { UpdateBuffSelected } from "@/API/buffs";
import { FeatureCardSwitch } from "@/components/FeatureCard";
import { FeatureComboBox } from "@/components/FeatureComboBox";
import FeatureSection from "@/components/FeatureSection";
import { FeatureSlider } from "@/components/FeatureSlider";
import FeatureWrapper from "@/components/FeatureWrapper";
import { KeybindInput } from "@/components/KeybindInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBuffs } from "@/hooks/useBuffs";
import { useEventMutation } from "@/hooks/useEvent";
import { useFeatureManager } from "@/hooks/useFeatureManager";
import { useKeybind } from "@/hooks/useKeybind";
import { TSelectedBuff } from "@/types/buff";
import { Dot } from "lucide-react";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";

export const Buff = () => {
  const { feature, OnUpdateFeature } = useFeatureManager();
  const [SelectedBuff, SetSelectedBuff] = useState<Partial<TSelectedBuff> | null>(null);
  const { data: buffs, ApplyBuff } = useBuffs();
  const [Buffid, SetBuffId] = React.useState<number | null>(null);
  const [buff, setBuff] = useState("");
  const { mutate } = useEventMutation();
  const { keybind, UpdateKeybind } = useKeybind();

  const buffOptions = useMemo(() => {
    return (
      buffs?.map((item, index) => ({
        label: item.name,
        real_value: item.id,
        value: `${item.name}-${index}`,
        stacks: item.stacks,
      })) ?? []
    );
  }, [buffs]);

  return (
    <section>
      <FeatureWrapper>
        <FeatureSection title="Character Buff">
          <FeatureCardSwitch
            title="Resonance Chain"
            description="Modify resonance chain."
            defaultCheck={feature.ResonanceChainModifier}
            onSwitch={() => {
              OnUpdateFeature("ResonanceChainModifier");
            }}
          >
            <FeatureSlider
              defaultValue={feature.ResonanceChainIndex!}
              disabled={!feature.ResonanceChainModifier}
              maxValue={6}
              onValueChange={(e) => {
                OnUpdateFeature("ResonanceChainIndex", e);
              }}
            />
          </FeatureCardSwitch>

          <FeatureCardSwitch
            title="Weapon Rank"
            description="Modify weapon rank."
            defaultCheck={feature.WeaponRankModifier}
            onSwitch={() => {
              OnUpdateFeature("WeaponRankModifier");
            }}
          >
            <FeatureSlider
              defaultValue={feature.WeaponRankIndex!}
              disabled={!feature.WeaponRankModifier}
              maxValue={5}
              onValueChange={(e) => {
                OnUpdateFeature("WeaponRankIndex", e);
              }}
            />
          </FeatureCardSwitch>

          <FeatureCardSwitch
            title="+100% Critical Rate"
            description="Always crit."
            defaultCheck={feature.AlwaysCrit}
            onSwitch={() => {
              OnUpdateFeature("AlwaysCrit");
            }}
          />

          <FeatureCardSwitch
            title="Sprint Buff"
            description="Increase sprint speed."
            defaultCheck={feature.IllusiveSprint}
            onSwitch={() => {
              OnUpdateFeature("IllusiveSprint");
            }}
          />

          <FeatureCardSwitch
            title="One Hit Kill"
            description="Damage 99% max HP."
            defaultCheck={feature.OneHitKill}
            onSwitch={() => {
              OnUpdateFeature("OneHitKill");
            }}
          />

          <FeatureCardSwitch
            title="Super Buff"
            description="Boost character stats."
            defaultCheck={feature.SuperBuff}
            onSwitch={() => {
              OnUpdateFeature("SuperBuff");
            }}
            Info={
              <div className="flex flex-col gap-1">
                <div className="">Increasing attributes</div>
                <div className="flex items-center">
                  <Dot />
                  <p>ATK +3000</p>
                </div>
                <div className="flex items-center">
                  <Dot />
                  <p>Critical Damage +200%</p>
                </div>
                <div className="flex items-center">
                  <Dot />
                  <p>Critical Rate +100%</p>
                </div>
              </div>
            }
          />

          <FeatureCardSwitch
            title="+50% Echoes"
            description="Increase echo drop."
            defaultCheck={feature.EchoesBuff}
            onSwitch={() => {
              OnUpdateFeature("EchoesBuff");
            }}
            Info={<p>Useless if databank {">"} 15</p>}
          />

          <FeatureCardSwitch
            title="+50% Material and Coin"
            description="Increase drops."
            defaultCheck={feature.MaterialShellBuff}
            onSwitch={() => {
              OnUpdateFeature("MaterialShellBuff");
            }}
          />

          <FeatureCardSwitch
            title="Ultimate Mode Zani"
            description="Always second form."
            defaultCheck={feature.Always2ndFormZani}
            onSwitch={() => {
              OnUpdateFeature("Always2ndFormZani");
            }}
          />

          <FeatureCardSwitch
            title="Ultimate Mode Fleurdelys"
            description="Skip transform animation."
            defaultCheck={feature.Always2ndFormFleurdelys}
            onSwitch={() => {
              OnUpdateFeature("Always2ndFormFleurdelys");
            }}
          />
        </FeatureSection>

        <div className="flex flex-col gap-5">
          <FeatureSection title="Custom Buff">
            <FeatureCardSwitch title="Apply Custom Buff" description="">
              <div className="flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <FeatureComboBox
                    data={buffOptions}
                    onSelect={(val) => {
                      toast(`Buff selected ID ${val.real_value}`);
                      SetSelectedBuff({
                        id: val.real_value,
                        name: val.label,
                        stacks: val.stacks,
                      });
                    }}
                    value={buff}
                    setValue={setBuff}
                  />
                </div>

                <Button
                  size={"lg"}
                  onClick={() => {
                    if (!SelectedBuff) {
                      return toast.error("Please select buff");
                    }
                    ApplyBuff(SelectedBuff);
                  }}
                >
                  Apply
                </Button>
              </div>
            </FeatureCardSwitch>

            <FeatureCardSwitch title="Custom Buff ID" description="">
              <div className="flex items-center gap-5">
                <Input
                  placeholder="Enter buff id..."
                  className="h-10"
                  onChange={(e) => {
                    const value = e.currentTarget.value;
                    if (Number(value)) SetBuffId(Number(value));
                    else SetBuffId(null);
                  }}
                />
                <Button
                  size={"lg"}
                  onClick={() => {
                    if (!Buffid) return toast.error("Invalid buff id");
                    UpdateBuffSelected({ id: Buffid, name: "Custom Buff", stacks: 1 });
                    mutate({ onApplyBuff: { status: true, data: { id: Buffid, name: "custom" } } });
                  }}
                >
                  Apply
                </Button>
              </div>
            </FeatureCardSwitch>
          </FeatureSection>

          <FeatureSection title="Stats Modifier">
            <FeatureCardSwitch
              title="Enable Stat Modifier"
              description="Allow stat modifications."
              defaultCheck={feature.StatEnhancement}
              onSwitch={() => {
                OnUpdateFeature("StatEnhancement");
              }}
              RightContent={
                <KeybindInput
                  keybind={keybind.StatEnhancement.key}
                  onBind={(key) => UpdateKeybind({ action: "StatEnhancement", key: key })}
                />
              }
            />

            <FeatureCardSwitch title="Attack" description="Increase attack +600 per stack.">
              <FeatureSlider
                defaultValue={feature.Atk!}
                disabled={!feature.StatEnhancement}
                maxValue={100}
                onValueChange={(e) => {
                  OnUpdateFeature("Atk", e);
                }}
              />
            </FeatureCardSwitch>

            <FeatureCardSwitch title="Critical Damage" description="Increase crit damage +20% per stack.">
              <FeatureSlider
                defaultValue={feature.Cdm!}
                disabled={!feature.StatEnhancement}
                maxValue={100}
                onValueChange={(e) => {
                  OnUpdateFeature("Cdm", e);
                }}
              />
            </FeatureCardSwitch>

            <FeatureCardSwitch title="Health" description="Increase HP +20% per stack.">
              <FeatureSlider
                defaultValue={feature.Hp!}
                disabled={!feature.StatEnhancement}
                maxValue={20}
                onValueChange={(e) => {
                  OnUpdateFeature("Hp", e);
                }}
              />
            </FeatureCardSwitch>
          </FeatureSection>
        </div>
      </FeatureWrapper>
    </section>
  );
};
