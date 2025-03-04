let songs = require("../models/songModel").songs;

// HÄMTA BEFINTLIGA LÅTAR
const getAllSongs = (req, res) => {
    res.status(200).json(songs);
};

// HÄMTA LÅT VIA ID
const getSongById = (req, res) => {
    const song = songs.find((s) => s.id === parseInt(req.params.id));
    if (!song) {
        res.status(404).json({ message: "Song not found" });
        return;
    }
    res.json(song);
};

// LÄGG TILL NY LÅT
const addSong = (req, res) => {
    const newSong = {
        id: songs.length + 1,
        title: req.body.title,
        artist: req.body.artist,
    };
    songs.push(newSong);
    res.status(201).json(newSong);
};

// UPPDATERA LÅT
const updateSong = (req, res) => {
    const songId = parseInt(req.params.id);
    const { title, artist } = req.body;

    const songIndex = songs.findIndex((song) => song.id === songId);

    if (songIndex === -1) {
        res.status(404).json({ message: "Song not found" });
        return;
    }

    songs[songIndex] = { ...users[songIndex], title, artist };
    res.json({ message: "Song updated successfully", song: songs[songIndex] });
};

// RADERA LÅT
const deleteSong = (req, res) => {
    const songId = parseInt(req.params.id);
    const songIndex = songs.findIndex((song) => song.id === songId);

    if (songIndex === -1) {
        res.status(404).json({ message: "Song not found" });
        return;
    }

    songs.splice(songIndex, 1);
    res.json({ message: "Song deleted successfully" });
};

module.exports = {
    getAllSongs,
    getSongById,
    addSong,
    updateSong,
    deleteSong,
};