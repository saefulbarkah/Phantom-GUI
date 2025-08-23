import { Request, Response } from "express";
import { EventState, oneTimeEvents } from "../const/Event";
import { TGameState } from "../types/mod";

let gameState = EventState;

export async function GetStatus(req: Request, res: Response) {
  const key = req.query.q as string;

  if (key) {
    if (key in gameState) {
      const val = gameState[key as keyof TGameState] ?? null;

      // reset one-time event
      if (val === true && oneTimeEvents.includes(key as keyof TGameState)) {
        gameState[key as keyof TGameState] = false;
      }

      return res.json({ [key]: val });
    } else {
      // key tidak valid
      return res.status(404).json({ error: `Key '${key}' not found` });
      // atau return { [key]: null } jika mau selalu return object
      // return res.json({ [key]: null });
    }
  }

  const result: Partial<TGameState> = {};
  for (const k in gameState) {
    let val = gameState[k as keyof TGameState] ?? null;

    // reset one-time event di sini juga
    if (val === true && oneTimeEvents.includes(k as keyof TGameState)) {
      gameState[k as keyof TGameState] = false;
    }

    result[k as keyof TGameState] = val;
  }

  return res.json(result);
}

export async function SetStatus(req: Request, res: Response) {
  gameState = { ...gameState, ...req.body }; // update status
  const body = req.body;
  return res.json(body);
}
