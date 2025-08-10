"use client";
import { TSetting } from "@/types/setting";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type TFeature = Partial<TSetting>;

interface TFeatureState {
  feature: TFeature;
  OnUpdateFeature: (key: keyof TFeature, value?: string | number | boolean) => void;
  setFeature: (newFeature: TFeature) => void;
}

const useFeatureManager = create<TFeatureState>()(
  devtools((set) => ({
    feature: {},

    // update specific feature
    OnUpdateFeature: (key, value) => {
      set((state) => {
        const prevValue = state.feature[key];
        if (typeof prevValue === "boolean" && value === undefined) {
          return { feature: { ...state.feature, [key]: !prevValue } };
        } else if (value !== undefined) {
          return { feature: { ...state.feature, [key]: value } };
        }
        return {};
      });
    },

    // binb data
    setFeature: (newFeature) =>
      set((state) => ({
        feature: { ...state.feature, ...newFeature }, // immutable
      })),
  }))
);

export default useFeatureManager;
