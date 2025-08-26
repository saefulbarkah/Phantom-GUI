import { Request, Response } from "express";
import { EventState, oneTimeEvents } from "../const/Event";

export async function GetStatus(req: Request, res: Response) {
  const key = req.query.q as string;

  if (key) {
    if (key in EventState) {
      const ev = EventState[key as keyof typeof EventState];

      if (ev.status === true && oneTimeEvents.includes(key as keyof typeof EventState)) {
        EventState[key as keyof typeof EventState] = { status: false, data: null };
      }

      return res.json({ [key]: ev });
    } else {
      return res.status(404).json({ error: `Key '${key}' not found` });
    }
  }

  const result: any = {};
  for (const k in EventState) {
    const ev = EventState[k as keyof typeof EventState];
    result[k] = ev;

    if (ev.status === true && oneTimeEvents.includes(k as keyof typeof EventState)) {
      EventState[k as keyof typeof EventState] = { status: false, data: null };
    }
  }

  return res.json(result);
}

export async function SetStatus(req: Request, res: Response) {
  const body = req.body; // misalnya: { onTeleport: { status: true, data: { x: 1, y: 2 } } }

  for (const k in body) {
    if (k in EventState) {
      EventState[k as keyof typeof EventState] = {
        status: body[k].status ?? true,
        data: body[k].data ?? null,
      };
    }
  }

  return res.json(body);
}
