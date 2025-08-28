import { ActionName, KeybindActionType } from "@/types/keybind";
import API from "./api";

export async function Getkeybinds() {
  const response = await API.get<Record<ActionName, KeybindActionType>>("/keybind");
  return response.data;
}

export async function UpdateKeybindSetting(data: KeybindActionType) {
  const response = await API.post("/keybind", data);
  return response.data;
}

export async function SaveKeybinds() {
  const response = await API.post("/keybind/save");
  return response.data;
}
