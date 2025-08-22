import cors from "cors";
import express from "express";
import { songs } from "./songs.js";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/songs", (_, res) => {
  res.json(songs);
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});