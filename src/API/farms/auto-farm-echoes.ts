import { TFilterFarm, TSonataList } from "@/types/farm";
import API from "../api";

export async function GetFarms() {
  const response = await API.get<TSonataList[]>("/farm/lists");
  return response.data;
}

export async function FilterSonata(body: TFilterFarm) {
  const response = await API.post<TSonataList>("/farm/filter", body);
  return response.data;
}
