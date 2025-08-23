package models

import "github.com/go-playground/validator/v10"

type GetEvent struct {
	OnTeleport        bool `json:"onTeleport"`
	OnNextTeleport    bool `json:"onNextTeleport"`
	OnPrevTeleport    bool `json:"onPrevTeleport"`
	OnStartFarmEchoes bool `json:"onStartFarmEchoes"`
	OnStopFarmEchoes  bool `json:"onStopFarmEchoes"`
	OnSaveConfig      bool `json:"onSaveConfig"`
	OnLoadConfig      bool `json:"onLoadConfig"`
	OnApplyBuff       bool `json:"onApplyBuff"`
	OnEnterDungeon    bool `json:"onEnterDungeon"`
	OnRefreshEchoes   bool `json:"onRefreshEchoes"`
	IsEchoesRefreshed bool `json:"isEchoesRefreshed"`
	OnWeaponAdded     bool `json:"onWeaponAdded"`
	OnRoleReplaced    bool `json:"onRoleReplaced"`
}

type EventUpdate struct {
	OnTeleport        *bool `json:"onTeleport,omitempty"`
	OnNextTeleport    *bool `json:"onNextTeleport,omitempty"`
	OnPrevTeleport    *bool `json:"onPrevTeleport,omitempty"`
	OnStartFarmEchoes *bool `json:"onStartFarmEchoes,omitempty"`
	OnStopFarmEchoes  *bool `json:"onStopFarmEchoes,omitempty"`
	OnSaveConfig      *bool `json:"onSaveConfig,omitempty"`
	OnLoadConfig      *bool `json:"onLoadConfig,omitempty"`
	OnApplyBuff       *bool `json:"onApplyBuff,omitempty"`
	OnEnterDungeon    *bool `json:"onEnterDungeon,omitempty"`
	OnRefreshEchoes   *bool `json:"onRefreshEchoes,omitempty"`
	IsEchoesRefreshed *bool `json:"isEchoesRefreshed,omitempty"`
	OnWeaponAdded     *bool `json:"onWeaponAdded,omitempty"`
	OnRoleReplaced    *bool `json:"onRoleReplaced,omitempty"`
}

var validate = validator.New()

func (e *GetEvent) Validate() error {
	return validate.Struct(e)
}
