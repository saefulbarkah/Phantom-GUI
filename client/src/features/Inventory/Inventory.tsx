"use client";
import { FeatureCardSwitch } from "@/components/FeatureCard";
import { FeatureComboBox, TOptionValue } from "@/components/FeatureComboBox";
import FeatureSection from "@/components/FeatureSection";
import FeatureWrapper from "@/components/FeatureWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRole } from "@/hooks/use-role";
import { useWeaponQuery } from "@/hooks/use-weapon";
import { useFeatureManager } from "@/hooks/useFeatureManager";
import { RefreshCcw } from "lucide-react";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";

export const Inventory = () => {
  const weaponQuery = useWeaponQuery();
  const role = useRole();
  const [WeaponValue, SetWeaponValue] = useState("");
  const [RankValue, SetRankValue] = useState("5");
  const [TargetRole, SetTargetRole] = useState("");
  const [ReplaceRole, SetReplaceRole] = useState("");
  const { feature, OnUpdateFeature } = useFeatureManager();

  const Weapons =
    useMemo(() => {
      return weaponQuery.data?.map((item) => ({
        ...item,
        label: item.name,
        value: item.name,
      }));
    }, [weaponQuery.data]) ?? [];

  const OwnRoles =
    useMemo(() => {
      return role.ownRole.data?.map((item) => ({
        label: item.name,
        value: item.name,
        ...item,
      }));
    }, [role.ownRole.data]) ?? [];

  const CustomRoles =
    useMemo(() => {
      return role.CustomRole.data?.map((item) => ({
        label: item.name,
        value: item.name,
        ...item,
      }));
    }, [role.CustomRole.data]) ?? [];

  const RankOptions: TOptionValue[] = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
  ];

  return (
    <section>
      <FeatureWrapper>
        <FeatureSection title="Custom Weapon">
          <FeatureCardSwitch
            title="Enable Custom Weapon"
            description="Equip and modify weapons with custom options"
            defaultCheck={feature.CustomWeapon}
            onSwitch={() => {
              OnUpdateFeature("CustomWeapon");
            }}
          >
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 items-center mt-5">
              <p>Weapon</p>
              <FeatureComboBox
                data={Weapons}
                value={WeaponValue}
                setValue={SetWeaponValue}
                onSelect={(data) => {
                  weaponQuery.UpdateWeapon({
                    id: data.id,
                    name: data.name,
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
              <Button
                className="flex-1"
                disabled={!weaponQuery.isSuccess || !feature.CustomWeapon}
                onClick={() => weaponQuery.addWeapon()}
              >
                Add
              </Button>
              <Button
                className="flex-1"
                disabled={!weaponQuery.isSuccess || !feature.CustomWeapon}
                onClick={() => weaponQuery.AddAllWeapon(weaponQuery?.data ?? [])}
              >
                Add all
              </Button>
              <Button className="flex-1" disabled={!weaponQuery.isSuccess} variant={"destructive"}>
                Remove all
              </Button>
              <Button size="icon" className="flex-shrink-0" onClick={() => weaponQuery.refreshWeapon()}>
                <RefreshCcw />
              </Button>
            </div>
          </FeatureCardSwitch>
        </FeatureSection>

        <FeatureSection title="Custom Role" description="Replace models and skills with custom roles">
          <FeatureCardSwitch>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 items-center">
              <p>Target Role</p>
              <FeatureComboBox
                data={OwnRoles}
                value={TargetRole}
                setValue={SetTargetRole}
                onSelect={(data) => {
                  role.store.setRole({ target: { id: data.id, name: data.value, skinId: data.skinId } });
                }}
              />

              <p>Replace With</p>
              <FeatureComboBox
                data={CustomRoles}
                value={ReplaceRole}
                setValue={SetReplaceRole}
                onSelect={(data) => {
                  role.store.setRole({ replacer: { id: data.id, name: data.value, skinId: data.skinId } });
                }}
              />
            </div>

            <div className="flex gap-2 mt-5 justify-end">
              <Button className="w-32" onClick={() => role.onSwitchRole()}>
                Apply
              </Button>
              <Button
                size="icon"
                onClick={() => {
                  role.CustomRole.refetch();
                  role.ownRole.refetch();
                  toast.success("Role refreshed");
                }}
              >
                <RefreshCcw />
              </Button>
            </div>
          </FeatureCardSwitch>
        </FeatureSection>
      </FeatureWrapper>
    </section>
  );
};
