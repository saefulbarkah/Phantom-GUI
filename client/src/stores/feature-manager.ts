"use client";
import { TBuffs, TSelectedBuff } from "@/types/buff";
import { TSetting } from "@/types/setting";
import { create } from "zustand";

export type TFeature = Partial<TSetting>;

type TFeatureState = {
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
  buffs: TBuffs[];
  SelectedBuff: Partial<TSelectedBuff>;
  SetSelectedBuff: (data: Partial<TSelectedBuff>) => void;
};

const useFeatureManagerStore = create<TFeatureState>()((set) => ({
  feature: {},
  NetworkStatus: "disconnected",
  SetNetworkStatus: (val) => set(() => ({ NetworkStatus: val })),

  IsFeatureReady: false,
  // binb data
  SetFeatureReady: (bool) => set(() => ({ IsFeatureReady: bool })),

  // update specific feature
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

  // binb data
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
}));

export default useFeatureManagerStore;
