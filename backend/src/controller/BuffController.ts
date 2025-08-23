import { Request, Response } from "express";
import { CheckIfConfigExist, LoadSettings, SaveSettings } from "../stores/settings-store";
import { TBuffs } from "../types/mod";
import { Buff } from "../const/Buff";
import { z } from "zod";
import chalk from "chalk";
import LOG from "../utils/logging";

export const TBuffsSchema = z.object({
  id: z.union([z.number(), z.array(z.number()).min(1)]),
  name: z.string(),
  stacks: z.number().nullable(),
});

const filePath = "./phantom-buff.json";

let state = Buff;
let state_selected: TBuffs[] = [];
let IsNewUpdated = false;

async function LoadConfig() {
  const data = await LoadSettings<TBuffs[]>(filePath, "Buff");
  if (data) {
    state = [...state, ...data];
  } else {
    state = [...state];
  }
  LOG.SUCCESS("Buff config loaded");
}

// Saat server mulai, load dulu dari file (sync/async sesuai kebutuhan)
async function initializeSettings() {
  if (CheckIfConfigExist(filePath)) {
    const data = await LoadSettings<TBuffs[]>(filePath, "Buff");
    if (data) {
      LOG.INFO("Buff loaded from file.");
      state = data;
    }
  } else {
    await SaveSettings<TBuffs[]>(state, filePath, "Buff");
    LOG.SUCCESS("Default buff config saved.");
  }
}

// Panggil ini sekali saat server start
initializeSettings();

export const GetBuffsettings = async (req: Request, res: Response) => {
  if (!CheckIfConfigExist(filePath)) {
    LOG.ERROR("Buff config missing");
    await LoadConfig();
  }
  res.json(state);
};

export async function GetSelectedBuff(req: Request, res: Response) {
  return res.json(state_selected);
}

export async function ClearSelectedBuff(req: Request, res: Response) {
  for (const buff of state_selected) {
    LOG.SUCCESS(`Buff applied, name: ${chalk.green(buff.name)} | ID: ${chalk.cyan(buff.id)}`);
  }
  LOG.INFO("Clearing buff selected");
  state_selected = [];
  return res.json({ success: true });
}

export const UpdateSelectedBuff = async (req: Request, res: Response) => {
  const parsed = TBuffsSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid data format",
      details: z.treeifyError(parsed.error),
    });
  }

  const body = req.body as TBuffs;
  state_selected = [...state_selected, { ...body }]; // update status
  IsNewUpdated = true;
  LOG.INFO(`Waiting for applying buff name: ${chalk.green(body.name)} | ID: ${chalk.cyan(body.id)}`);
  return res.json(body);
};

export const LoadBuffJSON = async (req: Request, res: Response) => {
  try {
    LoadConfig();
    console.log("load buff config");
    return res.json({ ok: "Config loaded", data: state });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update Buff" });
  }
};
