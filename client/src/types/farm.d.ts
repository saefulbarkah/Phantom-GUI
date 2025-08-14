export type TFarmMonsterList = {
  id: number;
  name: string;
  cost: number;
};

export type TFarmSonataEffect = { id: number; desc: string };

export type TSonataList = {
  id: number;
  name: string;
  icon: string;
  sonataEffects: TFarmSonataEffect[];
  monsters: TFarmMonsterList[];
};
