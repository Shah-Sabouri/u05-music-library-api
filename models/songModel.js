/* const songs = [
    { id: "1", title: "Picture Me Rollin", artist: "2pac" },
    { id: "2", title: "Time to Get it Together", artist: "Marvin Gaye" },
    { id: "3", title: "More Bounce To the Ounce", artist: "Zapp & Roger" },
];

module.exports = songs; */

const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    genre: { type: String },
    rating: { type: Number, min: 1, max: 5 }
});

module.exports = mongoose.model("Song", songSchema);
