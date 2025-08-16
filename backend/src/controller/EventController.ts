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
  onEnterDungeon?: boolean;
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
  isEchoesRefreshed: false,

  // apply buff
  onApplyBuff: false,

  // Dungeon
  onEnterDungeon: false,

  // Config
  onSaveConfig: false,
  onLoadConfig: false,
};

// daftar event yang auto-reset
const oneTimeEvents: (keyof TGameState)[] = [
  "onTeleport",
  "onNextTeleport",
  "onPrevTeleport",
  "onStartFarmEchoes",
  "onStopFarmEchoes",
  "onApplyBuff",
  "onSaveConfig",
  "onLoadConfig",
  "onEnterDungeon",
];

export async function GetStatus(req: Request, res: Response) {
  const key = req.query.q as string;
  let event: boolean | null = null;

  if (key && key in gameState) {
    event = gameState[key as keyof TGameState] ?? null;

    // hanya reset kalau event termasuk one-time
    if (event === true && oneTimeEvents.includes(key as keyof TGameState)) {
      gameState[key as keyof TGameState] = false;
    }
  }

  if (event === null) return res.status(404).json(null);

  return res.json({ [key]: event });
}

export async function SetStatus(req: Request, res: Response) {
  gameState = { ...gameState, ...req.body }; // update status
  const body = req.body;
  return res.json(body);
}
