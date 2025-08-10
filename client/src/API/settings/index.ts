import API from "../api";

export const GetFeatureSettings = async () => {
  try {
    const response = await API.get("/settings");
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
