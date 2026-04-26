import express from "express";
import {
  clearPredictionHistory,
  getPredictionHistory,
} from "../services/predictionStore.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const disease = req.query.disease?.toString();
    const limitParam = req.query.limit?.toString();
    const parsedLimit = Number(limitParam);
    const limit = Number.isFinite(parsedLimit) ? parsedLimit : undefined;

    const history = await getPredictionHistory({ disease, limit });

    res.json({
      count: history.length,
      items: history,
    });
  } catch (error) {
    console.error("Prediction history error:", error);
    res.status(500).json({ error: "Failed to fetch prediction history" });
  }
});

router.delete("/", async (_req, res) => {
  try {
    await clearPredictionHistory();
    res.json({ message: "Prediction history cleared" });
  } catch (error) {
    console.error("Prediction clear error:", error);
    res.status(500).json({ error: "Failed to clear prediction history" });
  }
});

export default router;
