"use client";
import { TBuffs, TSelectedBuff } from "@/types/buff";
import { TSetting } from "@/types/setting";
import { create } from "zustand";

export type TFeature = Partial<TSetting>;

type TFeatureState = {
  // feature general
  feature: TFeature;
  IsFeatureReady: boolean;
  NetworkStatus: "disconnected" | "connected" | "reconnect";
  SetNetworkStatus: (val: TFeatureState["NetworkStatus"]) => void;
  SetFeatureReady: (bool: boolean) => void;
  OnUpdateFeature: (
    key: keyof TFeature,
    value?: string | number | boolean
  ) => Record<keyof TFeature, string | number | boolean> | null;
  setFeature: (newFeature: TFeature) => void;

  // buffs
  buffs: TBuffs[];
  SelectedBuff: Partial<TSelectedBuff>;
  SetSelectedBuff: (data: Partial<TSelectedBuff>) => void;
  SetBuffs: (data: TBuffs[]) => void;
};

const useFeatureManagerStore = create<TFeatureState>()((set) => ({
  // feature general
  feature: {},
  NetworkStatus: "disconnected",
  SetNetworkStatus: (val) => set(() => ({ NetworkStatus: val })),
  IsFeatureReady: false,
  SetFeatureReady: (bool) => set(() => ({ IsFeatureReady: bool })),
  OnUpdateFeature: (key, value) => {
    let data = null;
    set((state) => {
      const prevValue = state.feature[key];
      if (typeof prevValue === "boolean" && value === undefined) {
        data = { [key]: !prevValue };
        return { feature: { ...state.feature, [key]: !prevValue } };
      } else if (value !== undefined) {
        data = { [key]: value };
        return { feature: { ...state.feature, [key]: value } };
      }
      return {};
    });
    return data;
  },
  setFeature: (newFeature) =>
    set((state) => ({
      feature: { ...state.feature, ...newFeature }, // immutable
    })),

  // buff manager
  buffs: [],
  SelectedBuff: {
    id: null,
    name: null,
    stacks: null,
  },
  SetSelectedBuff: (data) => set(() => ({ SelectedBuff: data })),
  SetBuffs: (data) =>
    set((state) => ({
      buffs: [...state.buffs, ...data],
    })),
}));

export default useFeatureManagerStore;
