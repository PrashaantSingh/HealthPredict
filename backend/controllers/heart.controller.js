import { predictHeart } from "../services/mlService.js";
import { appendPrediction } from "../services/predictionStore.js";

export async function heartController(req, res) {
  try {
    const prediction = await predictHeart(req.body);
    await appendPrediction({
      disease: "heart",
      input: req.body,
      result: prediction,
    });
    res.json(prediction);
  } catch (err) {
    console.error("Heart prediction error:", err);
    res.status(500).json({ error: "Failed to get prediction" });
  }
}
