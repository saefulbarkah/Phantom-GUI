import { Request, Response } from "express";

type TGameState = {
  onTeleport?: boolean;
  onNextTeleport?: boolean;
  onPrevTeleport?: boolean;
  onStartFarmEchoes?: boolean;
  onStopFarmEchoes?: boolean;
  onSaveConfig?: boolean;
  onLoadConfig?: boolean;
  onApplyBuff?: boolean;
  onRefreshEchoes?: boolean;
  isEchoesRefreshed?: boolean;
};

let gameState: TGameState = {
  // teleport
  onTeleport: false,
  onNextTeleport: false,
  onPrevTeleport: false,

  // farm echoes
  onStartFarmEchoes: false,
  onStopFarmEchoes: false,
  onRefreshEchoes: false,

  // apply buff
  onApplyBuff: false,

  // Config
  onSaveConfig: false,
  onLoadConfig: false,
};

export async function GetStatus(req: Request, res: Response) {
  const key = req.query.q as string;
  let event: boolean | null = null;

  if (key && key in gameState) {
    event = gameState[key as keyof TGameState] ?? null;
  }

  if (event === null) return res.json(gameState);

  return res.json({ [key]: event });
}

export async function SetStatus(req: Request, res: Response) {
  gameState = { ...gameState, ...req.body }; // update status
  const body = req.body;
  return res.json(body);
}
