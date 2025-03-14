import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import songRoutes from "./routes/songRoutes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/songs", songRoutes);

mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.log("Database connection error:", error));
