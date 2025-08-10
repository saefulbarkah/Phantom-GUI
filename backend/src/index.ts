import express from "express";
import dotenv from "dotenv";
import routes from "./routes/routes";
import cors from "cors";

dotenv.config();

const app = express();
const port = 4000;

// Atur CORS supaya origin tertentu diizinkan
app.use(
  cors({
    origin: ["http://localhost:1420", "http://localhost:3000", "http://tauri.localhost"], // ganti sesuai URL client
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// supaya bisa baca JSON di req.body
app.use(express.json());

app.get("/", (req, res) => {
  res.send("express + typescript");
});

// Routes
app.use("/api/game", routes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
