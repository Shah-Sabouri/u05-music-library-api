const express = require("express");
const { getAllSongs, getSongById, createSong, updateSong, deleteSong } = require("../controllers/songController")

const songRoutes = express.Router();

