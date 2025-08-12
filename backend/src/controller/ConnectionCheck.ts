import { Request, Response } from "express";

export async function CheckConnection(req: Request, res: Response) {
  return res.json("OK");
}
