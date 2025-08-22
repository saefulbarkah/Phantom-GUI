"use client";

import { UpdateEvent } from "@/API/Event";
import { GetCustomRoles, ReplaceRole } from "@/API/inventory/role";
import { TCustomRole } from "@/types/role";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { create } from "zustand";

type roleStore = {
  role: { replacer?: TCustomRole | null; target?: TCustomRole | null };
  setRole: (d: roleStore["role"]) => void;
};

const useStore = create<roleStore>((set) => ({
  role: {
    replacer: null,
    target: null,
  },
  setRole: (s) =>
    set((state) => ({
      role: { ...state.role, ...s },
    })),
}));

export const useRole = () => {
  const store = useStore();
  const CustomRole = useQuery({ queryKey: ["customRole", "CustomRole"], queryFn: () => GetCustomRoles("CustomRole") });
  const ownRole = useQuery({ queryKey: ["customRole", "OwnRole"], queryFn: () => GetCustomRoles("OwnRole") });

  const onSwitchRole = async () => {
    try {
      await ReplaceRole({
        replaceId: store.role.replacer!.id!,
        targetId: store.role.target!.id!,
      });
      await UpdateEvent({
        onRoleReplaced: true,
      });
      toast.success("Role replaced");
    } catch (error) {
      console.error(error);
    }
  };

  return { ownRole, CustomRole, onSwitchRole, store };
};
