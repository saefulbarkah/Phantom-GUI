import { TEvent } from "@/types/event";
import API from "./api";

export async function UpdateEvent(data: TEvent) {
  const response = await API.post("/status/update", data);
  return response.data;
}

export async function GetEvent(data: keyof TEvent) {
  const response = await API.get<TEvent>(`/status?q=${data}`);
  return response.data;
}
