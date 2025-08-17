import { TCustomRole } from "@/types/role";
import API from "../api";

export async function GetCustomRoles(t: string) {
  const response = await API.get<TCustomRole[]>(`inventory/roles?q=${t}`);
  return response.data;
}
