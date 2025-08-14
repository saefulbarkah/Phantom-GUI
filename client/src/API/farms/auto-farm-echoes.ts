import { TSonataList } from "@/types/farm";
import API from "../api";

export async function GetFarms() {
  const response = await API.get<TSonataList[]>("/farm/lists");
  return response.data;
}
