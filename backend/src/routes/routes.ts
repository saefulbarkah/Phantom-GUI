import express from "express";
import { GetStatus, SetStatus } from "../controller/EventController";
import { GetSettings, LoadSettingJSON, SaveSettingsJSON, UpdateSettings } from "../controller/SettingsController";
import { GetBuffsettings, GetSelectedBuff, LoadBuffJSON, UpdateSelectedBuff } from "../controller/BuffController";
import {
  GetDungeons,
  GetSelectedDungeon,
  LoadDungeonJSON,
  StoreDungeon,
  UpdateSelectedDungeon,
} from "../controller/DungeonController";
import { CheckConnection } from "../controller/ConnectionCheck";
import { FilterAutoFarm, GetFilteredFarm, GetSonataLists, StoreSonataLists } from "../controller/FarmController";
import { GetWeapons, StoreWeapons } from "../controller/WeaponController";
import { GetRoles, ReplaceRole, StoreRoles } from "../controller/RoleController";

const router = express.Router();

// Check Connection
router.get("/check", CheckConnection);

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

// Buff
router.get("/dungeons", GetDungeons);
router.get("/dungeons/check", GetSelectedDungeon);
router.post("/dungeons/update", UpdateSelectedDungeon);
router.post("/dungeons/store", StoreDungeon);
router.post("/dungeons/load", LoadDungeonJSON);

// Inventory -> Weapon
router.get("/inventory/weapons", GetWeapons);
router.post("/inventory/weapons", StoreWeapons);

// Inventory -> Roles
router.get("/inventory/roles", GetRoles);
router.post("/inventory/roles", StoreRoles);
router.post("/inventory/roles/switch", ReplaceRole);

// farms
router.get("/farm/lists", GetSonataLists);
router.post("/farm/lists", StoreSonataLists);
router.post("/farm/filter", FilterAutoFarm);
router.get("/farm/filter", GetFilteredFarm);

// event callback
router.get("/status", GetStatus);
router.post("/status/update", SetStatus);

export default router;
