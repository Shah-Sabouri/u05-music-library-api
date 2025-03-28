import { Request, Response } from "express";
import Song, { ISong } from "../models/songModel";
import mongoose from "mongoose";

// HÄMTA BEFINTLIGA LÅTAR
export const getAllSongs = async (req: Request, res: Response): Promise<void> => {
    try {
        const { artist, sort } = req.query;

        let query: { artist?: RegExp } = {};

        if (artist) {
            query.artist = new RegExp(artist.toString(), 'i'); 
        }

        let sortOrder: any = {};
        if (sort) {
            sortOrder = { rating: sort === 'desc' ? -1 : 1 }; 
        }

        const songs: ISong[] = await Song.find(query).sort(sortOrder);

        // Lägg till en extra kontroll om inga låtar hittas
        if (!songs || songs.length === 0) {
            console.log({ message: `No songs found for artist: ${artist}`});
            res.status(404).json({ message: `No songs found for artist: ${artist}`});
            return;

        }

        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: (error as Error).message });
    }
};


// HÄMTA LÅT VIA ID
export const getSongById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    // Kontrollerar om ID är i rätt format (MongoDB ObjectId)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid song ID format" });
        return;
    }

    try {
        const song: ISong | null = await Song.findById(id);
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
    const { title, artist, genre, rating } = req.body;

    // Kontrollerar att alla obligatoriska fält finns med
    if (!title || !artist || !genre || !rating) {
        res.status(400).json({ message: "All fields are required: title, artist, genre, rating" });
        return;
    }

    try {
        const newSong = new Song({ title, artist, genre, rating });

        const savedSong: ISong = await newSong.save();
        res.status(201).json(savedSong);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: (error as Error).message });
    }
};

// UPPDATERA LÅT
export const updateSong = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, artist, genre, rating } = req.body;

    // Kontrollera att alla obligatoriska fält finns med
    if (!title || !artist || !genre || !rating) {
        res.status(400).json({ message: "All fields are required: title, artist, genre, rating" });
        return;
    }

    // Kontrollera om ID är i rätt format (MongoDB ObjectId)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid song ID format" });
        return;
    }

    try {
        const updatedSong: ISong | null = await Song.findByIdAndUpdate(
            id,
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
    const { id } = req.params;

    // Kontrollera om ID är i rätt format (MongoDB ObjectId)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid song ID format" });
        return;
    }

    try {
        // Hämta låten innan radering
        const songToDelete: ISong | null = await Song.findById(id);

        if (!songToDelete) {
            res.status(404).json({ message: "Song not found" });
            return;
        }

        // Radera låten
        await Song.findByIdAndDelete(id);

        res.json({ message: `"${songToDelete.title}" was successfully deleted.` });
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
