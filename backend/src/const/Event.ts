import { TGameState } from "../types/mod";

export const EventState = {
  // teleport
  onTeleport: false,
  onNextTeleport: false,
  onPrevTeleport: false,

  // farm echoes
  onStartFarmEchoes: false,
  onStopFarmEchoes: false,
  onRefreshEchoes: false,
  isEchoesRefreshed: false,

  // Weapon
  onWeaponAdded: false,

  // role
  onRoleReplaced: false,

  // apply buff
  onApplyBuff: false,

  // Dungeon
  onEnterDungeon: false,

  // UID
  onChangeUID: false,

  // Config
  onSaveConfig: false,
  onLoadConfig: false,
};

// daftar event yang auto-reset
export const oneTimeEvents: (keyof typeof EventState)[] = [
  "onTeleport",
  "onNextTeleport",
  "onPrevTeleport",
  "onStartFarmEchoes",
  "onStopFarmEchoes",
  "onApplyBuff",
  "onSaveConfig",
  "onLoadConfig",
  "onEnterDungeon",
  "onWeaponAdded",
  "onRoleReplaced",
  "onChangeUID",
];
