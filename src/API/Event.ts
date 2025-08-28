import { TEvent } from "@/types/event";
import API from "./api";

export async function UpdateEvent(data: TEvent) {
  const response = await API.post("/status/update", data);
  return response;
}

export async function GetEvent<K extends keyof TEvent>(key: K): Promise<TEvent[K]> {
  const response = await API.get(`/status?q=${key}`);
  return response.data[key]; // ambil value sesuai key
}
