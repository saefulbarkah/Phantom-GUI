import { UpdateBuffSelected } from "@/API/buffs";
import { UpdateSetting } from "@/API/settings";
import useFeatureManagerStore, { TFeature } from "@/stores/feature-manager";
import toast from "react-hot-toast";

export const useFeatureManager = () => {
  const {
    feature,
    OnUpdateFeature: updateFeature,
    setFeature,
    IsFeatureReady,
    SetFeatureReady,
    NetworkStatus,
    SetNetworkStatus,
    buffs,
    SelectedBuff,
    SetSelectedBuff,
    SetBuffs,
  } = useFeatureManagerStore();

  const OnUpdateFeature = async (key: keyof TFeature, value?: string | number | boolean) => {
    const data = updateFeature(key, value);
    try {
      if (!data) return toast.error("Invalid update feature");
      await UpdateSetting(data);
    } catch (error) {
      console.log(error);
      toast.error(`Failed to update setting`);
    }
  };

  const OnApplyBuff = async (buff: typeof SelectedBuff) => {
    try {
      if (!buff.id) return toast.error(`Buff Id invalid`);
      await UpdateBuffSelected(buff);
    } catch (error) {
      console.log(error);
      toast.error(`Failed to apply buff`);
    }
  };

  return {
    OnUpdateFeature,
    feature,
    setFeature,
    IsFeatureReady,
    SetFeatureReady,
    NetworkStatus,
    SetNetworkStatus,
    buffs,
    SelectedBuff,
    SetSelectedBuff,
    SetBuffs,
    OnApplyBuff,
  };
};
