import { KeybindActionType } from "./keybind";
import { TFarmMonsterList } from "./farm";
import { TWeapon } from "./weapon";
import { teleportType } from "./teleport";

// generic untuk fleksibilitas
export type TEventValue<T = undefined> = [T] extends [undefined] ? { status: boolean } : { status: boolean; data: T };

export type TEvent = {
  onTeleport?: TEventValue<{ type: "AUTO" | "MANUAL" | "LOOP" | "BIND"; data: teleportType[]; enabled: boolean }>;
  onNextTeleport?: TEventValue;
  onPrevTeleport?: TEventValue;
  onStartFarmEchoes?: TEventValue<{ monsters: TFarmMonsterList[]; name: string; id: number }>;
  onStopFarmEchoes?: TEventValue;
  onSaveConfig?: TEventValue;
  onLoadConfig?: TEventValue;
  onApplyBuff?: TEventValue<{ id: number; name: string }>;
  onRefreshEchoes?: TEventValue;
  isEchoesRefreshed?: TEventValue;
  onEnterDungeon?: TEventValue<{ dungeonId: number; SkipEntrance: boolean }>;
  onWeaponAdded?: TEventValue<TWeapon[]>;
  onRemoveAllWeapon?: TEventValue;
  onRoleReplaced?: TEventValue<{ replaceId: number; targetId: number }>;
  onChangeUID?: TEventValue<{ uid: string; color: string }>;
  onShowFPS?: TEventValue;
  onESPTrigger?: TEventValue;
  onTreasureTpOverlayTrigger?: TEventValue<{ IsEnabled: boolean }>;
  onUnlockFPS?: TEventValue<{ IsEnabled: boolean }>;
  onFOVChanged?: TEventValue<{ fov: number }>;
  onKeybindChanged?: TEventValue<KeybindActionType[]>;
  onWorldSpeedChanged?: TEventValue<{ IsEnabled: boolean }>;
  onPlayerSpeedChanged?: TEventValue<{ IsEnabled: boolean }>;
  onNoClipChanged?: TEventValue<{ IsEnabled: boolean }>;
  onFreezeTime?: TEventValue<{ IsEnabled: boolean }>;
  onCopyCoordinate?: TEventValue;
};
