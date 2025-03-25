import { Request, Response } from "express";
import Song, { ISong } from "../models/songModel";

// HÄMTA BEFINTLIGA LÅTAR
export const getAllSongs = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const { artist, genre, rating } = req.query;

        let query: { artist?: RegExp, genre?: string, rating?: number } = {};

        // Filtrerar baserat på artist (case-insensitive match)
        if (artist) {
            query.artist = new RegExp(artist.toString(), 'i');
        }

        // Filtrerar baserat på genre
        if (genre) {
            query.genre = genre.toString();
        }

        // Filtrerar baserat på rating (konvertera till integer)
        if (rating) {
            query.rating = parseInt(rating.toString(), 10);
        }

        // Hämtar låtar baserat på den byggda queryn
        const songs: ISong[] = await Song.find(query);
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: (error as Error).message });
    }
};


// HÄMTA LÅT VIA ID
export const getSongById = async (req: Request, res: Response): Promise<void> => {
    try {
        const song: ISong | null = await Song.findById(req.params.id);
        if (!song) {
            res.status(404).json({ message: "Song not found" });
            return;
        }
        res.json(song);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: (error as Error).message });
    }
};

// LÄGG TILL NY LÅT
export const addSong = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, artist, genre, rating } = req.body;

        const newSong = new Song({ title, artist, genre, rating });

        const savedSong: ISong = await newSong.save();
        res.status(201).json(savedSong);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: (error as Error).message });
    }
};

// UPPDATERA LÅT
export const updateSong = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, artist, genre, rating } = req.body;

        const updatedSong: ISong | null = await Song.findByIdAndUpdate(
            req.params.id,
            { title, artist, genre, rating },
            { new: true }
        );

        if (!updatedSong) {
            res.status(404).json({ message: "Song not found" });
            return;
        }

        res.json(updatedSong);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: (error as Error).message });
    }
};

// RADERA LÅT
export const deleteSong = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedSong: ISong | null = await Song.findByIdAndDelete(req.params.id);

        if (!deletedSong) {
            res.status(404).json({ message: "Song not found" });
            return;
        }

        res.json({ message: "Song successfully deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: (error as Error).message });
    }
};

module.exports = {
    getAllSongs,
    getSongById,
    addSong,
    updateSong,
    deleteSong,
};
