const mongoose = require("mongoose");
const Song = require("../models/songModel");

// HÄMTA BEFINTLIGA LÅTAR
const getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find(); 
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// HÄMTA LÅT VIA ID
const getSongById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid song ID format" });
        }

        const song = await Song.findById(id);
        if (!song) {
            return res.status(404).json({ message: "Song not found" });
        }

        res.json(song);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// LÄGG TILL NY LÅT
const addSong = async (req, res) => {
    try {
        const { title, artist, genre, rating } = req.body;

        if (!title || !artist || !genre || rating == null) {
            return res.status(400).json({ message: "All fields are required: title, artist, genre, rating" });
        }

        const newSong = new Song({ title, artist, genre, rating });
        const savedSong = await newSong.save();
        res.status(201).json(savedSong);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// UPPDATERA LÅT
const updateSong = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, artist, genre, rating } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid song ID format" });
        }

        if (!title && !artist && !genre && rating == null) {
            return res.status(400).json({ message: "At least one field must be provided for update" });
        }

        const updatedSong = await Song.findByIdAndUpdate(
            id,
            { title, artist, genre, rating },
            { new: true }
        );

        if (!updatedSong) {
            return res.status(404).json({ message: "Song not found" });
        }

        res.json(updatedSong);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// RADERA LÅT
const deleteSong = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid song ID format" });
        }

        const deletedSong = await Song.findByIdAndDelete(id);

        if (!deletedSong) {
            return res.status(404).json({ message: "Song not found" });
        }

        res.json({ message: "Song successfully deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = {
    getAllSongs,
    getSongById,
    addSong,
    updateSong,
    deleteSong,
};
