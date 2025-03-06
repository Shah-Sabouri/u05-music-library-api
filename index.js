require('dotenv').config();
const express = require("express");
const connectDB = require("./database/db");

const app = express();
const PORT = process.env.PORT || 3000;

console.log("MongoDB URI:", process.env.MONGODB_URI);  // Kontrollerar URI:n

connectDB(); // Anslutning till MongoDB

app.use(express.json());

const songRouter = require("./routes/songRoutes"); // Importera dina routes
app.use("/api/songs", songRouter);

app.get("/", (req, res) => {
    res.send("Music API is live!");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});