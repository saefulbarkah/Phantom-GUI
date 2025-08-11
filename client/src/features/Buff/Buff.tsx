"use client";

import { FeatureCardSwitch } from "@/components/FeatureCard";
import { FeatureComboBox } from "@/components/FeatureComboBox";
import { FeatureSlider } from "@/components/FeatureSlider";
import { LoadingContent } from "@/components/LoadingContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFeatureManager } from "@/hooks/useFeatureManager";
import { Dot } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

const Buffs: { label: string; value: string; real_value: string | number }[] = [
  {
    label: "ATK +10.51251000",
    value: "ATK +10.51251000",
    real_value: 25,
  },
  {
    label: "ATK +10.0214100",
    value: "ATK +10.0214100",
    real_value: 25,
  },
  {
    label: "ATK +10.000",
    value: "ATK +10.000",
    real_value: 25,
  },
];

export const Buff = () => {
  const { feature, OnUpdateFeature, IsFeatureReady } = useFeatureManager();
  const [BuffSelected, SetBuffSelected] = React.useState<string | number>("");
  const [Buffid, SetBuffId] = React.useState<number | null>(null);

  if (!IsFeatureReady) return <LoadingContent />;

  return (
    <section className="flex flex-col gap-5">
      {/* Player */}
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold ">Character Buff</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <FeatureCardSwitch
            title="Resonance Chain"
            description="lorem adma msd asd as das"
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
            description="lorem adma msd asd as das"
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
            description="lorem adma msd asd as das"
            defaultCheck={feature.AlwaysCrit}
            onSwitch={() => {
              OnUpdateFeature("AlwaysCrit");
            }}
          />

          <FeatureCardSwitch
            title="Sprint Buff"
            description="lorem adma msd asd as das sad asd asda dasd das sda asdas as dasd asda sda d asdas das das das dasd  asdas das "
            defaultCheck={feature.IllusiveSprint}
            onSwitch={() => {
              OnUpdateFeature("IllusiveSprint");
            }}
          />

          <FeatureCardSwitch
            title="One Hit Kill"
            description="Dealing damage to enemy by 99% max hp enemy"
            defaultCheck={feature.OneHitKill}
            onSwitch={() => {
              OnUpdateFeature("OneHitKill");
            }}
          />

          <FeatureCardSwitch
            title="Super Buff"
            description="Increasing attribute character"
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
            description="Increasing echoes drop chance +50%"
            defaultCheck={feature.EchoesBuff}
            onSwitch={() => {
              OnUpdateFeature("EchoesBuff");
            }}
            Info={<p>Useless if your databank level over 15</p>}
          />

          <FeatureCardSwitch
            title="+50% Material and Coin"
            description="Increasing material and coin drop chance +50%"
            defaultCheck={feature.MaterialShellBuff}
            onSwitch={() => {
              OnUpdateFeature("MaterialShellBuff");
            }}
          />

          <FeatureCardSwitch
            title="Ultimate Mode Zani"
            description="Always on second form zani"
            defaultCheck={feature.Always2ndFormZani}
            onSwitch={() => {
              OnUpdateFeature("Always2ndFormZani");
            }}
          />

          <FeatureCardSwitch
            title="Ultimate Mode Fleurdelys"
            description="Skip animation transform to Fleurdelys mode"
            defaultCheck={feature.Always2ndFormFleurdelys}
            onSwitch={() => {
              OnUpdateFeature("Always2ndFormFleurdelys");
            }}
          />
        </div>
      </div>

      {/* Ability */}
      <div className="flex flex-col gap-5 mt-5">
        <h2 className="text-xl font-semibold">Stats Modifier</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <FeatureCardSwitch
            title="Enable Stat Modifier"
            description="To allow modify your stat, please enable this"
            defaultCheck={feature.StatEnhancement}
            onSwitch={() => {
              OnUpdateFeature("StatEnhancement");
            }}
          />

          <FeatureCardSwitch title="Attack" description="Increasing attack by +600 per stack, maximum stack 100">
            <FeatureSlider
              defaultValue={feature.Atk!}
              disabled={!feature.StatEnhancement}
              maxValue={100}
              onValueChange={(e) => {
                OnUpdateFeature("Atk", e);
              }}
            />
          </FeatureCardSwitch>

          <FeatureCardSwitch
            title="Critical Damage"
            description="Increasing crit damage by +20% per stack, maximum stack 100"
          >
            <FeatureSlider
              defaultValue={feature.Cdm!}
              disabled={!feature.StatEnhancement}
              maxValue={100}
              onValueChange={(e) => {
                OnUpdateFeature("Cdm", e);
              }}
            />
          </FeatureCardSwitch>

          <FeatureCardSwitch title="Health" description="Increasing Health by +20% per stack, maximum stack 20">
            <FeatureSlider
              defaultValue={feature.Hp!}
              disabled={!feature.StatEnhancement}
              maxValue={20}
              onValueChange={(e) => {
                OnUpdateFeature("Hp", e);
              }}
            />
          </FeatureCardSwitch>
        </div>
      </div>

      <div className="flex flex-col gap-5 mt-5">
        <h2 className="text-xl font-semibold">Custom Buff</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <FeatureCardSwitch title="Apply Custom Buff" description="">
            <div className="flex items-stretch gap-5">
              <FeatureComboBox
                data={Buffs}
                onSelect={(val) => {
                  toast(`Buff selected ID ${val}`);
                  SetBuffSelected(val);
                }}
              />
              <Button
                size={"lg"}
                onClick={() => {
                  if (BuffSelected === "" || !BuffSelected) {
                    return toast.error("Please select buff");
                  }

                  return toast("Applied buff " + BuffSelected);
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

                  if (Number(value)) {
                    SetBuffId(Number(value));
                  } else {
                    SetBuffId(null);
                  }
                }}
              />
              <Button
                size={"lg"}
                onClick={() => {
                  if (!Buffid) {
                    return toast.error("Invalid buff id");
                  }

                  return toast("Applied buff " + Buffid);
                }}
              >
                Apply
              </Button>
            </div>
          </FeatureCardSwitch>
        </div>
      </div>
    </section>
  );
};
