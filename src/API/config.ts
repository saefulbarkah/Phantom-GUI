import { Launcher } from "@/types/config";
import API from "./api";

export async function GetConfigLauncher() {
  const response = await API.get<Launcher>("/launcher");
  return response.data;
}

export async function StoreConfigLauncher(data: Launcher) {
  const response = await API.post("/launcher/store", data);
  return response;
}
