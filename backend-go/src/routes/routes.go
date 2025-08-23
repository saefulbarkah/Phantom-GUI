package routes

import (
	"phantom-server/src/controller"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.RouterGroup) {
	// events route
	event := &controller.EventHandler{}
	router.GET("/event", event.GetEvent)
	router.POST("/event", event.UpdateEvent)
}
