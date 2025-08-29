import { TeleportFileType, teleportType } from "@/types/teleport";
import API from "./api";

export async function GetTeleports() {
  const response = await API.get<TeleportFileType[]>("/teleport");
  return response.data;
}

export async function GetTeleportFile(file: string) {
  const response = await API.get<teleportType[]>(`/teleport/find?q=` + file);
  return response.data;
}
