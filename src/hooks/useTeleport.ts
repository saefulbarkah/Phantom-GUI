import { GetTeleportFile, GetTeleports } from "@/API/teleport";
import { teleportType } from "@/types/teleport";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { create } from "zustand";

// state shape
type TeleportState = {
  filename?: string | null;
  posNameTarget: string | null;
  pos?: { x: number; y: number; z: number } | null;
};

type teleportState = {
  teleportData: teleportType[];
  teleportSelected: teleportType | null;
  fileName: string;
  targetName: string;
  IsAutoTeleport: boolean;
  IsLoopEnabled: boolean;

  SetAutoTeleport: (v: boolean) => void;
  SetLoopTeleport: (v: boolean) => void;
  SetFileName: (v: string) => void;
  SetTargetName: (v: string) => void;
  SetTeleportData: (s: teleportType[]) => void;
  SetTeleportSelected: (s: teleportType) => void;
};

export const useTeleportState = create<teleportState>((set) => ({
  teleportSelected: null,
  teleportData: [],
  fileName: "",
  targetName: "",
  IsAutoTeleport: false,
  IsLoopEnabled: false,
  SetAutoTeleport: (v) => set({ IsAutoTeleport: v }),
  SetLoopTeleport: (v) => set({ IsLoopEnabled: v }),
  SetFileName: (v) => set({ fileName: v }),
  SetTargetName: (v) => set({ targetName: v }),
  SetTeleportData: (v) => set((state) => ({ teleportData: [...state.teleportData, ...v] })),
  SetTeleportSelected: (v) => set({ teleportSelected: v }),
}));

export const useTeleportFile = (filename: string) => {
  return useQuery({
    initialData: [],
    queryKey: ["teleport-file", filename],
    queryFn: () => GetTeleportFile(encodeURIComponent(filename)),
    enabled: filename !== "",
  });
};

export const useTeleport = () => {
  const [teleport, setTeleport] = useState<TeleportState>({ filename: null, pos: null, posNameTarget: null });
  const query = useQuery({ queryKey: ["teleports"], queryFn: GetTeleports });

  const onSelectedTeleport = (data: Partial<TeleportState>) => {
    return setTeleport((prev) => ({ ...prev, ...data }));
  };
  return { teleport, onSelectedTeleport, query };
};
