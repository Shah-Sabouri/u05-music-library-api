import express from "express";
import { getAllSongs, getSongById, addSong, updateSong, deleteSong } from "../controllers/songController";

const songRouter = express.Router();

songRouter.get("/", getAllSongs);
songRouter.get("/:id", getSongById);
songRouter.post("/", addSong);
songRouter.put("/:id", updateSong);
songRouter.delete("/:id", deleteSong);

export default songRouter;
