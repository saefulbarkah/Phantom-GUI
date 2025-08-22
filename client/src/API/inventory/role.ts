import { TCustomRole } from "@/types/role";
import API from "../api";

export async function GetCustomRoles(t: string) {
  const response = await API.get<TCustomRole[]>(`inventory/roles?q=${t}`);
  return response.data;
}

export async function ReplaceRole(data: { replaceId: number; targetId: number }) {
  const response = await API.post<TCustomRole[]>(`inventory/roles/switch`, data);
  return response;
}
