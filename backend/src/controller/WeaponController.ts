import { Request, Response } from "express";
import { TWeapon } from "../types/mod";

let data: TWeapon[] = [];

export async function GetWeapons(req: Request, res: Response) {
  return res.json(data);
}
