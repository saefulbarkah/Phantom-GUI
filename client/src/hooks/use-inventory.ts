"use client";

import { GetCustomRoles } from "@/API/inventory/role";
import { GetWeapons } from "@/API/inventory/weapon";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

export const useCustomRoleQuery = (t: string) => {
  return useQuery({ queryKey: ["customRole", t], queryFn: () => GetCustomRoles(t) });
};

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

  const AddAllWeapon = () => {
    toast.success("Added all weapon");
  };

  const addWeapon = () => {
    if (!weapon.name || !weapon.id) return;
    toast.success("Added weawpon " + weapon.name);
  };

  const UpdateWeapon = (data: Partial<WeaponStore>) => {
    SetWeapon((set) => ({
      ...set,
      ...data,
    }));
  };

  return { ...a, refreshWeapon, addWeapon, AddAllWeapon, weapon, UpdateWeapon };
};
