"use client";
import { ModSettings } from "@/constant/settings";
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
};

const useFeatureManagerStore = create<TFeatureState>()((set) => ({
  // feature general
  feature: ModSettings,
  NetworkStatus: "disconnected",
  SetNetworkStatus: (val) => set(() => ({ NetworkStatus: val })),
  IsFeatureReady: true,
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
}));

export default useFeatureManagerStore;
