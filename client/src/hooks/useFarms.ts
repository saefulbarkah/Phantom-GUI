import { GetFarms } from "@/API/farms/auto-farm-echoes";
import { TFarmMonsterList } from "@/types/farm";
import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";

type TFarmStore = {
  filter: {
    bySonataId?: number;
    byCost?: string;
    byEcho?: string;
  };
  setFilter: (data: TFarmStore["filter"]) => void;

  // monsters
  monsters: TFarmMonsterList[];
  setMonster: (data: TFarmStore["monsters"]) => void;
};

const FarmStore = create<TFarmStore>((set) => ({
  filter: {
    bySonataId: -1,
    byEcho: "All",
    byCost: "All",
  },
  setFilter: (data) =>
    set((state) => ({
      filter: { ...state.filter, ...data },
    })),

  // monsters
  monsters: [],
  setMonster: (data) =>
    set(() => ({
      monsters: [...data],
    })),
}));

export const useFarmState = () => {
  const data = FarmStore();
  return { ...data };
};

export const useFarms = () => {
  return useQuery({ queryKey: ["autoFarmEchoes"], queryFn: GetFarms, refetchOnMount: true });
};
