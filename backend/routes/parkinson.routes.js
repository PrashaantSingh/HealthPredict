import express from "express";
import { parkinsonController } from "../controllers/parkinson.controller.js";

const router = express.Router();

router.post("/", parkinsonController);

export default router;
