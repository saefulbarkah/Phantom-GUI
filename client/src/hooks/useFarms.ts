import { GetFarms } from "@/API/farms/auto-farm-echoes";
import { NullablePartial, TFarmMonsterList, TFilterFarm, TSonataList } from "@/types/farm";
import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";

type TFarmStore = {
  // event state
  IsFarmStart: boolean;
  setFarmStatus: (bool: boolean) => void;

  // sonata
  sonata: NullablePartial<TSonataList>;
  setSonata: (data: Partial<TFarmStore["sonata"]>) => void;

  // filter
  filter: TFilterFarm;
  setFilter: (data: Partial<TFarmStore["filter"]>) => void;

  // monsters
  monsters: TFarmMonsterList[];
  setMonster: (data: TFarmStore["monsters"]) => void;
};

const FarmStore = create<TFarmStore>((set) => ({
  IsFarmStart: false,
  setFarmStatus: (b) => set({ IsFarmStart: b }),

  sonata: {
    icon: null,
    id: null,
    monsters: [],
    name: null,
    sonataEffects: [],
  },
  setSonata: (data) =>
    set((state) => ({
      sonata: { ...state.sonata, ...data },
    })),

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
