export type TFarmMonsterList = {
  id: number;
  name: string;
  cost: number;
};

export type NullablePartial<T> = {
  [P in keyof T]?: T[P] | null;
};

export type TFarmSonataEffect = { id: number; desc: string };
export type TFilterFarm = {
  bySonataId: number | null;
  byCost: string | null | number;
  byEcho: string | null;
};
export type TSonataList = {
  id: number;
  name: string;
  icon: string;
  sonataEffects: TFarmSonataEffect[];
  monsters: TFarmMonsterList[];
};
