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
};

let gameState: TGameState = {
  // teleport
  onTeleport: false,
  onNextTeleport: false,
  onPrevTeleport: false,

  // farm echoes
  onStartFarmEchoes: false,
  onStopFarmEchoes: false,

  // apply buff
  onApplyBuff: false,

  // Config
  onSaveConfig: false,
  onLoadConfig: false,
};

export async function GetStatus(req: Request, res: Response) {
  const current = { ...gameState, ...req.body };

  // callback button events
  gameState = {
    // teleport
    onTeleport: false,
    onNextTeleport: false,
    onPrevTeleport: false,

    // farm echoes
    onStartFarmEchoes: false,
    onStopFarmEchoes: false,

    // apply buff
    onApplyBuff: false,

    // Config
    onSaveConfig: false,
    onLoadConfig: false,
  };

  return res.json(current);
}

export async function SetStatus(req: Request, res: Response) {
  gameState = { ...gameState, ...req.body }; // update status
  console.log(req.body);
  const body = req.body;
  return res.json(body);
}
