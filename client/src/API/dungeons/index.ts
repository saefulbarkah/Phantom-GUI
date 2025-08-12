import { TDungeon } from "@/types/dungeon";
import API from "../api";
import { AxiosResponse } from "axios";

export async function GetDungeons(): Promise<TDungeon[]> {
  try {
    const response = await API.get<TDungeon[]>("/dungeons");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function EnterDungeon(data: TDungeon) {
  await API.post<TDungeon, AxiosResponse<TDungeon>, TDungeon>("/dungeons/update", data);
}
