const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    genre: { type: String },
    rating: { type: Number, min: 1, max: 5 }
});

module.exports = mongoose.model("Song", songSchema);
