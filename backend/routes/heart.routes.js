import express from "express";
import { heartController } from "../controllers/heart.controller.js";

const router = express.Router();

router.post("/", heartController);

export default router;
