import { Request, Response } from "express";
import { TWeapon } from "../types/mod";
import z from "zod";
import LOG from "../utils/logging";

const TWeaponSchema = z.object({
  id: z.number().min(1),
  name: z.string().min(1),
});

let weapons: TWeapon[] = [];

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
