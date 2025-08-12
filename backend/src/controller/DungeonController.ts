import { Request, Response } from "express";
import { CheckIfConfigExist, LoadSettings, SaveSettings } from "../stores/settings-store";
import { TDungeon } from "../types/mod";
import { z } from "zod";
import chalk from "chalk";
import LOG from "../utils/logging";
import { Dungeons } from "../const/Dungeon";

export const TDungeonSchema = z.object({
  id: z.number().min(1),
  name: z.string(),
});

const filePath = "./phantom-dungeon.json";

let state = Dungeons;
let state_selected: TDungeon = { id: null, name: null };

async function LoadConfig() {
  const data = await LoadSettings<TDungeon[]>(filePath, "Dungeon");
  if (data) {
    state = [...state, ...data];
  } else {
    state = [...state];
  }
  LOG.SUCCESS("Dungeon config loaded");
}

// Saat server mulai, load dulu dari file (sync/async sesuai kebutuhan)
async function initializeSettings() {
  if (CheckIfConfigExist(filePath)) {
    const data = await LoadSettings<TDungeon[]>(filePath, "Dungeon");
    if (data) {
      LOG.INFO("Dungeon loaded from file.");
      state = data;
    }
  } else {
    await SaveSettings<TDungeon[]>(state, filePath, "Dungeon");
    LOG.SUCCESS("Default dungeon saved.");
  }
}

// Panggil ini sekali saat server start
initializeSettings();

export const GetDungeons = async (req: Request, res: Response) => {
  if (!CheckIfConfigExist(filePath)) {
    LOG.ERROR("Dungeon config missing");
    await LoadConfig();
  }
  res.json(state);
};

export async function GetSelectedDungeon(req: Request, res: Response) {
  const current: typeof state_selected = { ...state_selected, ...req.body };

  // reset when entering dungeon
  state_selected = {
    id: null,
    name: null,
  };

  if (current.id) {
    LOG.SUCCESS(`Entering dungeon: ${chalk.green(current.name)} | id: ${chalk.cyan(current.id)}`);
  }

  return res.json(current);
}

export const UpdateSelectedDungeon = async (req: Request, res: Response) => {
  const parsed = TDungeonSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid data format",
      details: z.treeifyError(parsed.error),
    });
  }

  const body = req.body as TDungeon;
  state_selected = { ...state_selected, ...body }; // update status
  LOG.INFO(`Waiting for entering dungeon, name: ${chalk.green(body.name)} | ID: ${chalk.cyan(body.id)}`);
  return res.json(body);
};

export const StoreDungeon = async (req: Request, res: Response) => {
  const body = req.body as TDungeon[];
  const parsed = z.array(TDungeonSchema).safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid data format",
      details: z.treeifyError(parsed.error),
    });
  }

  const newDungeons = body.filter((newItem) => !state.some((existingItem) => existingItem.id === newItem.id));

  if (newDungeons.length === 0) {
    LOG.INFO(`No dungeon added`);
    return res.json(state);
  }

  LOG.SUCCESS(`${newDungeons.length} dungeon was stored`);

  state = [...state, ...newDungeons];
  await SaveSettings(state, filePath, "Dungeon");
  return res.json(state);
};

export const LoadDungeonJSON = async (req: Request, res: Response) => {
  try {
    LoadConfig();
    LOG.INFO("Load dungeon from json");
    return res.json({ ok: "Dungeons loaded", data: state });
  } catch (err) {
    LOG.ERROR(err);
    res.status(500).json({ error: "Failed to load dungeons" });
  }
};
