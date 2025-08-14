import { Request, Response } from "express";
import z from "zod";
import LOG from "../utils/logging";
import { CheckIfConfigExist, LoadSettings, SaveSettings } from "../stores/settings-store";

const TSonataSchema = z.object({
  id: z.number().min(1),
  name: z.string().min(1),
  icon: z.string().min(1),
  sonataEffects: z.array(
    z.object({
      id: z.number().min(1),
      desc: z.string().min(1),
    })
  ),
  monsters: z.array(
    z.object({
      id: z.number().min(1),
      name: z.string().min(1),
      cost: z.number().min(1),
    })
  ),
});
type TSonataList = z.infer<typeof TSonataSchema>;
let sonataLists: TSonataList[] = [];

let filePath = "phantom-farm.json";
async function initializeSettings() {
  if (CheckIfConfigExist(filePath)) {
    const data = await LoadSettings<TSonataList[]>(filePath, "Farm");
    if (data) {
      LOG.INFO("farm loaded from file.");
      sonataLists = data;
    }
  } else {
    await SaveSettings<TSonataList[]>(sonataLists, filePath, "Farm");
    LOG.SUCCESS("Default farms saved.");
  }
}

initializeSettings();

// Get sonata lists
export async function GetSonataLists(req: Request, res: Response) {
  return res.json(sonataLists);
}

// Store sonata lists to memory
export async function StoreSonataLists(req: Request, res: Response) {
  const body = req.body as TSonataList[];
  const parsed = z.array(TSonataSchema).safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid data format",
      details: z.treeifyError(parsed.error),
    });
  }

  const sonataList = body.filter((newItem) => !sonataLists.some((existingItem) => existingItem.id === newItem.id));

  if (sonataList.length === 0) {
    return res.json(sonataLists);
  }

  LOG.SUCCESS(`${sonataList.length} sonata was loaded`);

  sonataLists = [...sonataLists, ...sonataList];
  await SaveSettings(sonataLists, filePath, "phantom-farm");
  return res.json(sonataLists);
}

// Filter sonata
let sonataList: Partial<TSonataList> | null = null;

export async function GetFilteredFarm(req: Request, res: Response) {
  if (!sonataList) {
    sonataList = {
      id: sonataLists[0].id,
      name: sonataLists[0].name,
      sonataEffects: sonataLists[0].sonataEffects,
      monsters: sonataLists[0].monsters,
    };
  }
  return res.json(sonataList);
}

// Filter sonata
const FilterSonataSchema = z.object({
  bySonataId: z.number(),
  byEcho: z.union([z.literal("All"), z.string()]).nullable(),
  byCost: z.union([z.literal("All"), z.number()]).nullable(),
});

type TFilterSonata = z.infer<typeof FilterSonataSchema>;

export async function FilterAutoFarm(req: Request, res: Response) {
  const parsed = FilterSonataSchema.safeParse(req.body as TFilterSonata);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid data format",
      details: z.treeifyError(parsed.error),
    });
  }

  const filter = parsed.data;
  let filtered: Partial<TSonataList> = {};

  if (filter.bySonataId) {
    const d = sonataLists.filter((item) => item.id === filter.bySonataId)[0];
    filtered = {
      id: d.id,
      name: d.name,
      monsters: d.monsters,
      sonataEffects: d.sonataEffects,
      icon: d.icon,
    };
    LOG.INFO(`Start filter auto farm sonata: ${filtered.name}`);
  }

  if (filter.byEcho && filter.byEcho !== "All") {
    filtered.monsters = filtered.monsters?.filter((item) => item.name.includes(filter.byEcho as string));
    LOG.INFO(`Filter by echo ${filter.byEcho}`);
  }

  if (filter.byCost && filter.byCost !== "All") {
    filtered.monsters = filtered.monsters?.filter((item) => item.cost === filter.byCost);
    LOG.INFO(`Filter by cost ${filter.byCost}`);
  }

  LOG.SUCCESS(`${filtered.monsters?.length} monster founds`);

  res.json(filtered);
}
