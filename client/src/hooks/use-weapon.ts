"use client";

import { AddWeapon as OnAddWeapon, GetWeapons } from "@/API/inventory/weapon";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { UpdateEvent } from "@/API/Event";
import { TWeapon } from "@/types/weapon";

type WeaponStore = {
  rank: number;
  level: number;
  name: string | null;
  id: number | null;
};

export const useWeaponQuery = () => {
  const [weapon, SetWeapon] = useState<WeaponStore>({
    rank: 5,
    level: 90,
    name: null,
    id: null,
  });

  const a = useQuery({ queryKey: ["customWeapon"], queryFn: GetWeapons });

  const refreshWeapon = () => {
    toast.success("refreshed");
  };

  const AddAllWeapon = async (data: TWeapon[]) => {
    try {
      if (data.length === 0) return;
      const mapped = data.map((item) => ({
        id: item.id,
        name: item.name,
        level: weapon.level,
        rank: weapon.rank,
      }));
      await OnAddWeapon(mapped);
      toast.success(`All weapon added`);
      await UpdateEvent({ onWeaponAdded: true });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to add all weapon");
    }
  };

  const addWeapon = async () => {
    if (!weapon.name || !weapon.id) return;

    try {
      await OnAddWeapon([{ id: weapon.id, name: weapon.name, level: weapon.level, rank: weapon.rank }]);
      toast.success(`Weapon ${weapon.name} added`);
      await UpdateEvent({ onWeaponAdded: true });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to add weapon");
    }
  };

  const UpdateWeapon = (data: Partial<WeaponStore>) => {
    SetWeapon((set) => ({
      ...set,
      ...data,
    }));
  };

  return { ...a, refreshWeapon, addWeapon, AddAllWeapon, weapon, UpdateWeapon };
};
