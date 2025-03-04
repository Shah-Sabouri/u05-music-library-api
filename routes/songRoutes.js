const express = require("express");
const { getAllSongs, getSongById, addSong, updateSong, deleteSong } = require("../controllers/songController")

const songRouter = express.Router();

songRouter.get("/songs", getAllSongs);
songRouter.get("/songs/:id", getSongById);
songRouter.post("/new-song", addSong);
songRouter.put("/update/:id", updateSong);
songRouter.delete("/delete/:id", deleteSong);

module.exports = songRouter;