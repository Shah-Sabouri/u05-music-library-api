const Song = require("../models/songModel");

// HÄMTA BEFINTLIGA LÅTAR
const getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find(); // Hämtar alla låtar från databasen
        res.status(200).json(songs);

    } catch (error) {
        res.status(500).json( {message: "Server Error"} );
    }
};

// HÄMTA LÅT VIA ID
const getSongById = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);

        if (!song) {
            return res.status(404).json({ message: "Song not found" });
        }

        res.json(song);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


// LÄGG TILL NY LÅT
const addSong = async (req, res) => {
    try {
        const { title, artist, genre, rating } = req.body;

        const newSong = new Song ({
            title,
            artist,
            genre,
            rating
        });

        const savedSong = await newSong.save(); // Sparar låten i databasen
        res.status(201).json(savedSong); // Skickar tillbaks sparad låt som svar
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// UPPDATERA LÅT
const updateSong = async (req, res) => {
    try {
        const { title, artist, genre, rating } = req.body;

        const updatedSong = await Song.findByIdAndUpdate(
            req.params.id,
            { title, artist, genre, rating },
            { new: true } // Returnerar uppdaterad låt
        );

        if (!updatedSong) {
            return res.status(404).json({ message: "Song not found" });
        }

        res.json(updatedSong); // Skickar tillbaka uppdaterad låt
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// RADERA LÅT
const deleteSong = async (req, res) => {
    try {
        const deletedSong = await Song.findByIdAndDelete(req.params.id); // Raderar låt från databas

        if (!deletedSong) {
            return res.status(404).json({ message: "Song not found" });
        }

        res.json({ message: "Song successfully deleted" }); // Bekräftar att låten tagits bort
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    getAllSongs,
    getSongById,
    addSong,
    updateSong,
    deleteSong,
};