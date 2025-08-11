import express from "express";
import { GetStatus, SetStatus } from "../controller/GameStateController";
import { GetSettings, LoadSettingJSON, SaveSettingsJSON, UpdateSettings } from "../controller/SettingsController";
import { GetBuffsettings, GetSelectedBuff, LoadBuffJSON, UpdateSelectedBuff } from "../controller/BuffController";

const router = express.Router();

// settings
router.get("/settings", GetSettings);
router.post("/settings/update", UpdateSettings);
router.post("/settings/save", SaveSettingsJSON);
router.post("/settings/load", LoadSettingJSON);

// Buff
router.get("/buffs", GetBuffsettings);
router.get("/buffs/check", GetSelectedBuff);
router.post("/buffs/update", UpdateSelectedBuff);
router.post("/buffs/load", LoadBuffJSON);

// event callback
router.get("/status", GetStatus);
router.post("/status/update", SetStatus);

export default router;
