import fs from "fs";
import { TModSettings } from "../types/mod";

const filePath = "./settings.json";

export function CheckIfConfigExist() {
  if (fs.existsSync(filePath)) {
    return true;
  } else {
    return false;
  }
}

export async function SaveSettings(setting: TModSettings) {
  const data = JSON.stringify(setting, null, 2);
  fs.writeFileSync(filePath, data, "utf-8");
  console.log("JSON settings saved!");
}

export async function LoadSettings(): Promise<TModSettings | null> {
  if (!fs.existsSync(filePath)) {
    console.error("Settings file not found.");
    return null;
  }

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent) as TModSettings;
  } catch (err) {
    console.error("Error reading settings file:", err);
    return null;
  }
}
