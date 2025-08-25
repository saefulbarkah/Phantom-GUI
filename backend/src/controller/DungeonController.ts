import { Request, Response } from "express";
import { z } from "zod";
import LOG from "../utils/logging";

export const TDungeonSchema = z.object({
  id: z.number().min(1),
  name: z.string(),
});

let dungeonLists: z.infer<typeof TDungeonSchema>[] = [];

async function initializeDungeons() {
  try {
    const response = await fetch(
      "https://jigvihdbsdvfmzakalqw.supabase.co/storage/v1/object/public/phantom-waves/dungeon.json",
      {
        method: "GET",
      }
    );
    const raw = await response.json();

    // Validasi array
    const parsed = z.array(TDungeonSchema).parse(raw);

    dungeonLists = parsed.map((item) => ({
      id: item.id,
      name: item.name,
    }));

    LOG.INFO("Dungeon loaded");
  } catch (error) {
    LOG.ERROR("Invalid fetch dungeons");
  }
}

initializeDungeons();

export const GetDungeons = async (req: Request, res: Response) => {
  res.json(dungeonLists);
};
