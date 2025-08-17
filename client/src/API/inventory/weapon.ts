import { TWeapon } from "@/types/weapon";
import API from "../api";

export async function GetWeapons() {
  const response = await API.get<TWeapon[]>("/inventory/weapons");
  return response.data;
}
