import express from "express";
import routes from "./routes/routes";
import cors from "cors";
import LOG from "./utils/logging";

const app = express();
const port = 51235;

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
  res.json("Phantom server");
});

// Routes
app.use("/api/game", routes);

app.listen(port, () => {
  LOG.INFO(`Server running on port ${port}`);
});
