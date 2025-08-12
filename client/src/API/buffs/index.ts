import { TBuffs, TSelectedBuff } from "@/types/buff";
import API from "../api";
import { AxiosResponse } from "axios";

// get all buffs
export async function GetBuffs() {
  const response = await API.get<TBuffs[]>("/buffs");
  console.log(response);
  return response.data;
}

export async function UpdateBuffSelected(data: Partial<TSelectedBuff>) {
  const response = await API.post<TSelectedBuff, AxiosResponse<TSelectedBuff>, Partial<TSelectedBuff>>(
    "/buffs/update",
    data
  );
  console.log(response.data);
}

// for getting buff selected
export async function GetSelectedBuff() {
  const response = await API.get<TBuffs>("/buffs/check");
  console.log(response);
  return response.data;
}

// load config
export async function LoadConfig() {
  const response = await API.get<{ data: TBuffs[] }>("/buffs/load");
  console.log(response);
  return response.data.data;
}
