import { Request, Response } from "express";
import { TCustomRole, TRole, TWeapon } from "../types/mod";

let data: TCustomRole = {
  CustomRoles: [],
  OwnRoles: [],
};

export async function GetRoles(req: Request, res: Response) {
  const query = req.query.q as "OwnRole" | "CustomRole";
  if (query === "OwnRole") return res.json(data.OwnRoles);
  if (query === "CustomRole") return res.json(data.CustomRoles);
  return res.json([]);
}
