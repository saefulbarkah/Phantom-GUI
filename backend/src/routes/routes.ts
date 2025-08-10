import express from "express";
import { GetStatus, SetStatus } from "../controller/GameStateController";
import {
  GetSettings,
  LoadSettingJSON,
  SaveSettingsJSON,
  UpdateSettings,
} from "../controller/SettingsController";

const router = express.Router();

// settings
router.get("/settings", GetSettings);
router.post("/settings/update", UpdateSettings);
router.post("/settings/save", SaveSettingsJSON);
router.post("/settings/load", LoadSettingJSON);

// event callback
router.get("/status", GetStatus);
router.post("/status/update", SetStatus);

export default router;
