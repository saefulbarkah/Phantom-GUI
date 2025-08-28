export type ActionName =
  | "ModMenu"
  | "KillAura"
  | "Flight"
  | "MobVacuum"
  | "NextTp"
  | "PrevTp"
  | "MarkTp"
  | "QuestTp"
  | "NoClip"
  | "WorldSpeed"
  | "PlayerSpeed"
  | "ReloadBuffConfig"
  | "TreasureTeleport"
  | "AlwaysShowCursor"
  | "FreezeGameTime"
  | "EchoVacuum"
  | "AutoRestartDungeon"
  | "CopyTpCordinate"
  | "UnstuckLoading"
  | "ApplyBuff"
  | "SkipQuestNode"
  | "StatEnhancement";

export type KeybindActionType = {
  key: string | null;
  action: ActionName;
  type: string;
};
