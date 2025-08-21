import { TWeapon } from "@/types/weapon";
import API from "../api";

export async function GetWeapons() {
  const response = await API.get<TWeapon[]>("/inventory/weapons");
  return response.data;
}

export async function AddWeapon(data: TWeapon[]) {
  const response = await API.post("/inventory/weapons/add", data);
  return response;
}
