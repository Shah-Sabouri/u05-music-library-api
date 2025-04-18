import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import songRoutes from "./routes/songRoutes";

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "3000", 10);
const allowedOrigins = ['https://jovial-sunflower-f85d8e.netlify.app']

app.use(express.json());

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

app.get("/", (req: Request, res: Response): void => {
    res.send("Music Library API is live!");
});

app.use("/api/songs", songRoutes);

mongoose
    .connect(process.env.MONGO_DB as string)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.log("Database connection error:", error));
