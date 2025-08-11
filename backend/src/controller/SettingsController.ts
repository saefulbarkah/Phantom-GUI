import { Request, Response } from "express";
import { ModSettings } from "../const/ModSettings";
import { CheckIfConfigExist, LoadSettings, SaveSettings } from "../stores/settings-store";
import { TModSettings } from "../types/mod";

const filePath = "./phantom.json";

let state = { ...ModSettings };

// Saat server mulai, load dulu dari file (sync/async sesuai kebutuhan)
async function initializeSettings() {
  if (CheckIfConfigExist(filePath)) {
    const data = await LoadSettings<TModSettings>(filePath, "setting");
    if (data) {
      console.log("Settings loaded from file.");
      state = data;
    }
  } else {
    await SaveSettings<TModSettings>(state, filePath, "setting");
    console.log("Default settings saved.");
  }
}

// Panggil ini sekali saat server start
initializeSettings();

export const GetSettings = async (req: Request, res: Response) => {
  res.json(state);
};

export const UpdateSettings = async (req: Request, res: Response) => {
  const newSettings = req.body as Partial<TModSettings>;

  if (!newSettings || Object.keys(newSettings).length === 0) {
    return res.status(400).json({ error: "No settings provided or object is empty" });
  }

  try {
    // Update in-memory state (optional)
    state = { ...state, ...newSettings };

    res.json({ ok: "Settings updated", settings: newSettings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update settings" });
  }
};

export const SaveSettingsJSON = async (req: Request, res: Response) => {
  try {
    await SaveSettings<TModSettings>(state, filePath, "setting");
    res.json({ ok: "Settings saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update settings" });
  }
};

export const LoadSettingJSON = async (req: Request, res: Response) => {
  try {
    const data = await LoadSettings<TModSettings>(filePath, "setting");
    state = { ...state, ...data };
    res.json({ ok: "Config loaded" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update settings" });
  }
};
