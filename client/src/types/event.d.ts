import { KeybindActionType } from "./keybind";

// generic untuk fleksibilitas
export type TEventValue<T = undefined> = [T] extends [undefined] ? { status: boolean } : { status: boolean; data: T };

export type TEvent = {
  onTeleport?: TEventValue;
  onNextTeleport?: TEventValue;
  onPrevTeleport?: TEventValue;
  onStartFarmEchoes?: TEventValue;
  onStopFarmEchoes?: TEventValue;
  onSaveConfig?: TEventValue;
  onLoadConfig?: TEventValue;
  onApplyBuff?: TEventValue<{ id: number; name: string }>;
  onRefreshEchoes?: TEventValue;
  isEchoesRefreshed?: TEventValue;
  onEnterDungeon?: TEventValue<{ dungeonId: number; SkipEntrance: boolean }>;
  onWeaponAdded?: TEventValue;
  onRoleReplaced?: TEventValue<{ replaceId: number; targetId: number }>;
  onChangeUID?: TEventValue<{ uid: string; color: string }>;
  onShowFPS?: TEventValue;
  onESPTrigger?: TEventValue;
  onTreasureTpOverlayTrigger?: TEventValue;
  onUnlockFPS?: TEventValue;
  onFOVChanged?: TEventValue<{ fov: number }>;
  onKeybindChanged?: TEventValue<KeybindActionType>;
};
