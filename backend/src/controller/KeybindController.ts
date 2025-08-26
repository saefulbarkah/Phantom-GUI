import { Request, Response } from "express";
import { z } from "zod";
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
