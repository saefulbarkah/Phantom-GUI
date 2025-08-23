import { Request, Response } from "express";
import { TCustomRole } from "../types/mod";
import LOG from "../utils/logging";
import z from "zod";

let role: TCustomRole = {
  CustomRoles: [],
  OwnRoles: [],
};

const TRoleSchema = z.object({
  type: z.string(),
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
});

export async function GetRoles(req: Request, res: Response) {
  const query = req.query.q as "OwnRole" | "CustomRole";
  LOG.INFO(query);
  if (query === "OwnRole") return res.json(role.OwnRoles);
  if (query === "CustomRole") return res.json(role.CustomRoles);
  return res.json([]);
}

export async function StoreRoles(req: Request, res: Response) {
  const data = req.body as z.infer<typeof TRoleSchema>;
  const parsed = TRoleSchema.safeParse(data);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: "Invalid data format",
      details: z.treeifyError(parsed.error),
    });
  }

  if (data.type === "OwnRole") {
    const roleFiltered = data.data.filter(
      (newItem) => !role.OwnRoles.some((existingItem) => existingItem.id === newItem.id)
    );
    if (roleFiltered.length > 0) {
      role.OwnRoles = [...role.OwnRoles, ...roleFiltered];
      LOG.SUCCESS(`Own Role ${data.data.length} was stored`);
    }
    res.json({ success: true });
  }

  if (data.type === "CustomRole") {
    const roleFiltered = data.data.filter(
      (newItem) => !role.CustomRoles.some((existingItem) => existingItem.id === newItem.id)
    );
    if (roleFiltered.length > 0) {
      LOG.SUCCESS(`Custom Role ${data.data.length} was stored`);
      role.CustomRoles = [...role.CustomRoles, ...roleFiltered];
    }
    res.json({ success: true });
  }

  res.status(404).json({ success: false });
}

const TReplaceSchema = z.object({
  replaceId: z.number(),
  targetId: z.number(),
});

export async function ReplaceRole(req: Request, res: Response) {
  const data = req.body as z.infer<typeof TReplaceSchema>;
  const parsed = TReplaceSchema.safeParse(data);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid data format",
      details: z.treeifyError(parsed.error),
    });
  }

  const FindOwnRole = role.OwnRoles.find((item) => item.id === data.targetId);
  const FindReplaceRole = role.CustomRoles.find((item) => item.id === data.replaceId);

  if (!FindOwnRole || !FindReplaceRole) {
    LOG.INFO("Target replace role not found");
    return res.json({ replaceId: null, targetId: null, message: "Target role not found" });
  }

  LOG.SUCCESS(`Role changer`);

  return res.json({ ...data, message: "Ready to replace" });
}
