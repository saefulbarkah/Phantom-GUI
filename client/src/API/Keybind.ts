import { ActionName, KeybindActionType } from "@/types/keybind";
import API from "./api";

export async function Getkeybinds() {
  const response = await API.get<Record<ActionName, KeybindActionType>>("/keybind");
  return response.data;
}
