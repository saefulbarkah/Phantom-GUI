import { Request, Response } from "express";
import { keyof, z } from "zod";
import LOG from "../utils/logging";
import { CheckIfConfigExist, LoadSettings, SaveSettings } from "../stores/settings-store";
import { DEFAULT_KEYBINDS, KEY_TYPE } from "../const/Keybinds";

let KEYBIND_CONFIG_NAME = "phantom-keybind.json";

let keybinds: KEY_TYPE | null = null;

async function initializeKeybinds() {
  try {
    if (!CheckIfConfigExist(KEYBIND_CONFIG_NAME)) {
      await SaveSettings(DEFAULT_KEYBINDS, KEYBIND_CONFIG_NAME, "keybind");
    } else {
      const config = await LoadSettings(KEYBIND_CONFIG_NAME, "keybind");
      keybinds = config as KEY_TYPE;
    }
    LOG.INFO("Keybind loaded");
  } catch (error) {
    LOG.ERROR("Invalid load Keybind");
  }
}

initializeKeybinds();

export const GetKeybinds = async (req: Request, res: Response) => {
  res.json(keybinds);
};

export const UpdateKeybind = async (req: Request, res: Response) => {
  const { action, key, type } = req.body as {
    action: keyof KEY_TYPE;
    type: string;
    key: "string" | null;
  };

  if (!keybinds || !keybinds[action]) return res.json("Failed to update keybind");

  keybinds[action].action = action;
  keybinds[action].type = type;
  keybinds[action].key = key;

  res.json("Keybind updated");
};

export const SaveKeybindJSON = async (req: Request, res: Response) => {
  await SaveSettings(keybinds, KEYBIND_CONFIG_NAME, "Keybind");
  res.json("Keybind saved");
};
