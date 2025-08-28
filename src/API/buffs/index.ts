import { TBuffs, TSelectedBuff } from "@/types/buff";
import API from "../api";
import { AxiosResponse } from "axios";

// get all buffs
export async function GetBuffs() {
  const response = await API.get<TBuffs[]>("/buffs");
  return response.data;
}

export async function UpdateBuffSelected(data: Partial<TSelectedBuff>) {
  await API.post<TSelectedBuff, AxiosResponse<TSelectedBuff>, Partial<TSelectedBuff>>("/buffs/update", data);
}

// for getting buff selected
export async function GetSelectedBuff() {
  const response = await API.get<TBuffs>("/buffs/check");
  return response.data;
}

// load config
export async function LoadConfig() {
  const response = await API.get<{ data: TBuffs[] }>("/buffs/load");
  return response.data.data;
}

// load config
export async function SaveBuffConfig() {
  const response = await API.post("/buffs/save");
  return response.data.data;
}
