"use client";
import { FeatureCardSwitch } from "@/components/FeatureCard";
import { FeatureComboBox, TOptionValue } from "@/components/FeatureComboBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCustomRoleQuery, useWeaponQuery } from "@/hooks/use-inventory";
import { useFeatureManager } from "@/hooks/useFeatureManager";
import { RefreshCcw } from "lucide-react";
import React, { useMemo, useState } from "react";

export const Inventory = () => {
  const weaponQuery = useWeaponQuery();
  const CustomRole = useCustomRoleQuery("CustomRole");
  const OwnRole = useCustomRoleQuery("OwnRole");
  const [WeaponValue, SetWeaponValue] = useState("");
  const [RankValue, SetRankValue] = useState("");
  const [TargetRole, SetTargetRole] = useState("");
  const [ReplaceRole, SetReplaceRole] = useState("");
  const { feature, OnUpdateFeature } = useFeatureManager();

  const Weapons =
    useMemo(() => {
      return weaponQuery.data?.map((item) => ({
        label: item.name,
        value: item.name,
        id: item.id,
      }));
    }, [weaponQuery.data]) ?? [];

  const OwnRoles =
    useMemo(() => {
      return OwnRole.data?.map((item) => ({
        label: item.name,
        value: item.name,
        id: item.id,
      }));
    }, [OwnRole.data]) ?? [];

  const CustomRoles =
    useMemo(() => {
      return CustomRole.data?.map((item) => ({
        label: item.name,
        value: item.name,
        id: item.id,
      }));
    }, [CustomRole.data]) ?? [];

  const RankOptions: TOptionValue[] = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
  ];

  return (
    <section className="flex flex-col gap-5">
      {/* Player */}
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold ">Inventory</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-3">
          <div>
            <FeatureCardSwitch
              title="Custom Weapon"
              description="You can use custom weapon"
              defaultCheck={feature.CustomWeapon}
              onSwitch={() => {
                OnUpdateFeature("CustomWeapon");
              }}
            >
              <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 items-center">
                <p>Weapon</p>
                <FeatureComboBox
                  data={Weapons}
                  value={WeaponValue}
                  setValue={SetWeaponValue}
                  onSelect={(data) => {
                    weaponQuery.UpdateWeapon({
                      id: data.id,
                    });
                  }}
                />

                <p>Rank</p>
                <FeatureComboBox
                  data={RankOptions}
                  value={RankValue}
                  setValue={SetRankValue}
                  onSelect={(data) => {
                    weaponQuery.UpdateWeapon({
                      rank: Number(data.value),
                    });
                  }}
                />

                <p>Level</p>
                <Input
                  defaultValue={weaponQuery.weapon.level}
                  onChange={(e) => {
                    if (!Number(e.currentTarget.value)) return;
                    weaponQuery.UpdateWeapon({
                      rank: Number(e.currentTarget.value),
                    });
                  }}
                />
              </div>

              <div className="flex gap-2 mt-5 w-full">
                <Button className="flex-1" onClick={() => weaponQuery.addWeapon()}>
                  Add
                </Button>
                <Button className="flex-1" onClick={() => weaponQuery.AddAllWeapon()}>
                  Add all
                </Button>
                <Button className="flex-1" variant={"destructive"}>
                  Remove all
                </Button>
                <Button size="icon" className="flex-shrink-0" onClick={() => weaponQuery.refreshWeapon()}>
                  <RefreshCcw />
                </Button>
              </div>
            </FeatureCardSwitch>
          </div>

          <div>
            <FeatureCardSwitch
              title="Custom Role"
              description="You can use custom role only replacing models and skills"
            >
              <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 items-center">
                <p>Target Role</p>
                <FeatureComboBox data={OwnRoles} value={TargetRole} setValue={SetTargetRole} onSelect={(data) => {}} />

                <p>Replace With</p>
                <FeatureComboBox
                  data={CustomRoles}
                  value={ReplaceRole}
                  setValue={SetReplaceRole}
                  onSelect={(data) => {}}
                />
              </div>

              <div className="flex gap-2 mt-5 justify-end">
                <Button className="w-32">Apply</Button>
                <Button size="icon">
                  <RefreshCcw />
                </Button>
              </div>
            </FeatureCardSwitch>
          </div>
        </div>
      </div>
    </section>
  );
};
