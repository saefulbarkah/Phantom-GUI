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
  } = useFeatureManagerStore();

  const OnUpdateFeature = async (key: keyof TFeature, value?: string | number | boolean) => {
    const data = updateFeature(key, value);
    try {
      if (data) {
        const response = await UpdateSetting(data);
        console.log(response?.data);
        toast.success(`${response?.data.ok}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Failed to update setting`);
    }
  };

  return { OnUpdateFeature, feature, setFeature, IsFeatureReady, SetFeatureReady, NetworkStatus, SetNetworkStatus };
};
