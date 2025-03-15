"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const songController_1 = require("../controllers/songController");
const songRouter = express_1.default.Router();
songRouter.get("/", songController_1.getAllSongs);
songRouter.get("/:id", songController_1.getSongById);
songRouter.post("/", songController_1.addSong);
songRouter.put("/:id", songController_1.updateSong);
songRouter.delete("/:id", songController_1.deleteSong);
exports.default = songRouter;
