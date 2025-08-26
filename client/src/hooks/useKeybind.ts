"use client";

import { ActionName, KeybindActionType } from "@/types/keybind";
import { useEventMutation } from "./useEvent";
import { create } from "zustand";
import { useQuery } from "@tanstack/react-query";
import { Getkeybinds } from "@/API/Keybind";
import { DEFAULT_KEYBINDS } from "@/constant/keybinds";

type TKeybindStore = {
  keybind: Record<ActionName, KeybindActionType>;
  SetKeybind: (action: ActionName, data: KeybindActionType) => void;
  SyncKeybinds: (data: Record<ActionName, KeybindActionType>) => void;
};

const useKeybindStore = create<TKeybindStore>((set) => ({
  keybind: DEFAULT_KEYBINDS,
  SetKeybind: (action, data) =>
    set((state) => ({
      keybind: { ...state.keybind, [action]: data },
    })),

  SyncKeybinds: (data) =>
    set((state) => ({
      keybind: { ...state.keybind, ...data }, // merge data dari server
    })),
}));

export const useKeybind = () => {
  const query = useQuery({ queryKey: ["keybind"], queryFn: Getkeybinds });
  const { keybind, SetKeybind, SyncKeybinds } = useKeybindStore();
  const { mutateAsync: SendEvent } = useEventMutation();

  const UpdateKeybind = (data: Pick<KeybindActionType, "action" | "key">) => {
    SendEvent({ onKeybindChanged: { status: true, data: { ...data, type: "Toggle" } } }).catch((err) =>
      console.error(err)
    );
    SetKeybind(data.action, { ...data, type: "Toggle" });
  };

  return { UpdateKeybind, keybind, SetKeybind, querykeybind: query, SyncKeybinds };
};
