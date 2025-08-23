package controller

import (
	"net/http"
	"phantom-server/src/models"

	"github.com/gin-gonic/gin"
)

type EventHandler struct {
	State models.GetEvent
}

func (h *EventHandler) GetEvent(c *gin.Context) {
	data := h.State
	h.State = models.GetEvent{} // reset state
	c.IndentedJSON(http.StatusOK, data)
}

func (h *EventHandler) UpdateEvent(c *gin.Context) {
	var Body models.EventUpdate

	if err := c.ShouldBindJSON(&Body); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	if Body.OnTeleport != nil {
		h.State.OnTeleport = *Body.OnTeleport
	}
	if Body.OnNextTeleport != nil {
		h.State.OnNextTeleport = *Body.OnNextTeleport
	}
	if Body.OnPrevTeleport != nil {
		h.State.OnPrevTeleport = *Body.OnPrevTeleport
	}
	if Body.OnStartFarmEchoes != nil {
		h.State.OnStartFarmEchoes = *Body.OnStartFarmEchoes
	}
	if Body.OnStopFarmEchoes != nil {
		h.State.OnStopFarmEchoes = *Body.OnStopFarmEchoes
	}
	if Body.OnSaveConfig != nil {
		h.State.OnSaveConfig = *Body.OnSaveConfig
	}
	if Body.OnLoadConfig != nil {
		h.State.OnLoadConfig = *Body.OnLoadConfig
	}
	if Body.OnApplyBuff != nil {
		h.State.OnApplyBuff = *Body.OnApplyBuff
	}
	if Body.OnEnterDungeon != nil {
		h.State.OnEnterDungeon = *Body.OnEnterDungeon
	}
	if Body.OnRefreshEchoes != nil {
		h.State.OnRefreshEchoes = *Body.OnRefreshEchoes
	}
	if Body.IsEchoesRefreshed != nil {
		h.State.IsEchoesRefreshed = *Body.IsEchoesRefreshed
	}
	if Body.OnWeaponAdded != nil {
		h.State.OnWeaponAdded = *Body.OnWeaponAdded
	}
	if Body.OnRoleReplaced != nil {
		h.State.OnRoleReplaced = *Body.OnRoleReplaced
	}

	h.State.OnTeleport = true
	c.IndentedJSON(http.StatusOK, h.State)
}
