import mongoose, { Schema, Document } from "mongoose";

export interface ISong extends Document {
    title: string;
    artist: string;
    genre: string;
    rating: number;
}

const SongSchema: Schema = new Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    genre: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
});

export default mongoose.model<ISong>("Song", SongSchema);
