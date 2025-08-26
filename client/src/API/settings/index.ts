import API from "../api";
import { TSetting } from "../../types/setting";

export const GetFeatureSettings = async () => {
  try {
    const response = await API.get("/settings");
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

type TUpdateSetting = Record<keyof TSetting, string | boolean | number>;
export const UpdateSetting = async (data: TUpdateSetting) => {
  try {
    const response = await API.post("/settings/update", data);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const SaveSettings = async () => {
  try {
    const response = await API.post("/settings/save");
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
