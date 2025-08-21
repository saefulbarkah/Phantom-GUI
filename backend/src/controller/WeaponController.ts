import { Request, Response } from "express";
import z from "zod";
import LOG from "../utils/logging";

const TWeaponSchema = z.object({
  id: z.number().nullable(),
  name: z.string().nullable(),
  icon: z.string().nullable(),
});

type TWeapon = z.infer<typeof TWeaponSchema>;
let weapons: TWeapon[] = [];

async function initializeWeapons() {
  try {
    const response = await fetch(
      "https://jigvihdbsdvfmzakalqw.supabase.co/storage/v1/object/public/phantom-waves/weapons.json",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    weapons = data.map((item: Partial<TWeapon>) => ({
      id: item.id,
      name: item.name,
      icon: `https://api.hakush.in/ww/UI/UIResources/Common/Image/IconWeapon/${item.icon}.webp`,
    }));
  } catch (error) {
    LOG.ERROR("Invalid fetch weapon");
  }
}

initializeWeapons();

export async function GetWeapons(req: Request, res: Response) {
  return res.json(weapons);
}

// Store sonata lists to memory
export async function StoreWeapons(req: Request, res: Response) {
  const body = req.body as TWeapon[];
  const parsed = z.array(TWeaponSchema).safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid data format",
      details: z.treeifyError(parsed.error),
    });
  }

  const weaponFiltered = body.filter((newItem) => !weapons.some((existingItem) => existingItem.id === newItem.id));

  LOG.SUCCESS(`${weaponFiltered.length} weapon was stored`);

  weapons = [...weapons, ...weaponFiltered];
  return res.json(weapons);
}

// Add weapon
const TWeaponAddedSchema = z.object({
  id: z.number(),
  name: z.string(),
  rank: z.number(),
  level: z.number(),
});
let weaponAddedState: z.infer<typeof TWeaponAddedSchema>[] = [];
export async function OnAddWeapon(req: Request, res: Response) {
  const data = req.body as z.infer<typeof TWeaponAddedSchema>[];
  const parsed = z.array(TWeaponAddedSchema).safeParse(data);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid data format",
      details: z.treeifyError(parsed.error),
    });
  }

  weaponAddedState = [...weaponAddedState, ...data.filter((item) => !weaponAddedState.some((w) => w.id === item.id))];

  return res.json({ message: "Weapon added", data: weaponAddedState });
}

// Get weapon added
export async function OnGetWeaponAdded(req: Request, res: Response) {
  return res.json(weaponAddedState);
}
