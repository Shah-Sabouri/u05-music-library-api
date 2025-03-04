const express = require("express");
const { getAllSongs, getSongById, addSong, updateSong, deleteSong } = require("../controllers/songController")

const songRouter = express.Router();

songRouter.get("/", getAllSongs);
songRouter.get("/:id", getSongById);
songRouter.post("/", addSong);
songRouter.put("/:id", updateSong);
songRouter.delete("/:id", deleteSong);

module.exports = songRouter;