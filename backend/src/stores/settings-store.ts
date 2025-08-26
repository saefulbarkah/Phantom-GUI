import fs from "fs";
import LOG from "../utils/logging";

export function CheckIfConfigExist(filePath: string) {
  if (fs.existsSync(filePath)) {
    return true;
  } else {
    return false;
  }
}

export async function SaveSettings<T>(setting: T, filePath: string, name: string) {
  const data = JSON.stringify(setting, null, 2);
  fs.writeFileSync(filePath, data, "utf-8");
  LOG.SUCCESS(`${name} saved to json`);
}

export async function LoadSettings<T>(filePath: string, name: string): Promise<T | null> {
  if (!fs.existsSync(filePath)) {
    console.error(`${name} file not found.`);
    return null;
  }

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(fileContent) as T;
    return json;
  } catch (err) {
    console.error(`Error reading ${name} file:`, err);
    return null;
  }
}
