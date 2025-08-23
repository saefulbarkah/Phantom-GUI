package main

import (
	"fmt"
	"log"
	"os"
	"phantom-server/src/routes"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load .env
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Ambil variabel
	port := os.Getenv("APP_PORT")

	gin.SetMode(gin.ReleaseMode)
	router := gin.New()
	router.Use(gin.Recovery())

	v1 := router.Group("/api/game")
	routes.SetupRoutes(v1)

	fmt.Println("Server running on port", port)
	router.Run(":" + port)
}
