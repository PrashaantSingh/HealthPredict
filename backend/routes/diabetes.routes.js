import express from "express";
import {diabetesController} from '../controllers/diabetes.controller.js'
const router = express.Router();

router.post("/", diabetesController);

export default router;
