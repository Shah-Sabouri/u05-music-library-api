"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSong = exports.updateSong = exports.addSong = exports.getSongById = exports.getAllSongs = void 0;
const songModel_1 = __importDefault(require("../models/songModel"));
// HÄMTA BEFINTLIGA LÅTAR
const getAllSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songs = yield songModel_1.default.find();
        res.status(200).json(songs);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});
exports.getAllSongs = getAllSongs;
// HÄMTA LÅT VIA ID
const getSongById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const song = yield songModel_1.default.findById(req.params.id);
        if (!song) {
            res.status(404).json({ message: "Song not found" });
            return;
        }
        res.json(song);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});
exports.getSongById = getSongById;
// LÄGG TILL NY LÅT
const addSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, artist, genre, rating } = req.body;
        const newSong = new songModel_1.default({ title, artist, genre, rating });
        const savedSong = yield newSong.save();
        res.status(201).json(savedSong);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});
exports.addSong = addSong;
// UPPDATERA LÅT
const updateSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, artist, genre, rating } = req.body;
        const updatedSong = yield songModel_1.default.findByIdAndUpdate(req.params.id, { title, artist, genre, rating }, { new: true });
        if (!updatedSong) {
            res.status(404).json({ message: "Song not found" });
            return;
        }
        res.json(updatedSong);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});
exports.updateSong = updateSong;
// RADERA LÅT
const deleteSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedSong = yield songModel_1.default.findByIdAndDelete(req.params.id);
        if (!deletedSong) {
            res.status(404).json({ message: "Song not found" });
            return;
        }
        res.json({ message: "Song successfully deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});
exports.deleteSong = deleteSong;
module.exports = {
    getAllSongs: exports.getAllSongs,
    getSongById: exports.getSongById,
    addSong: exports.addSong,
    updateSong: exports.updateSong,
    deleteSong: exports.deleteSong,
};
