import express from "express";
import { GetStatus, SetStatus } from "../controller/EventController";
import { GetSettings, LoadSettingJSON, SaveSettingsJSON, UpdateSettings } from "../controller/SettingsController";
import {
  ClearSelectedBuff,
  GetBuffsettings,
  GetSelectedBuff,
  LoadBuffJSON,
  UpdateSelectedBuff,
} from "../controller/BuffController";
import { GetDungeons } from "../controller/DungeonController";
import { CheckConnection } from "../controller/ConnectionCheck";
import { FilterAutoFarm, GetFilteredFarm, GetSonataLists, StoreSonataLists } from "../controller/FarmController";
import { GetWeapons, OnAddWeapon, OnGetWeaponAdded, StoreWeapons } from "../controller/WeaponController";
import { GetReplaceRole, GetRoles, ReplaceRole, StoreRoles } from "../controller/RoleController";
import { GetKeybinds } from "../controller/KeybindController";

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
router.get("/buffs/clear", ClearSelectedBuff);
router.post("/buffs/update", UpdateSelectedBuff);
router.post("/buffs/load", LoadBuffJSON);

// Dungeon
router.get("/dungeons", GetDungeons);

// Inventory -> Weapon
router.get("/inventory/weapons", GetWeapons);
router.post("/inventory/weapons", StoreWeapons);
router.post("/inventory/weapons/add", OnAddWeapon);
router.get("/inventory/weapons/check", OnGetWeaponAdded);

// Inventory -> Roles
router.get("/inventory/roles", GetRoles);
router.post("/inventory/roles", StoreRoles);
router.post("/inventory/roles/switch", ReplaceRole);
router.get("/inventory/roles/switch", GetReplaceRole);

// farms
router.get("/farm/lists", GetSonataLists);
router.post("/farm/lists", StoreSonataLists);
router.post("/farm/filter", FilterAutoFarm);
router.get("/farm/filter", GetFilteredFarm);

// Keybind
router.get("/keybind", GetKeybinds);

// event callback
router.get("/status", GetStatus);
router.post("/status/update", SetStatus);

export default router;
