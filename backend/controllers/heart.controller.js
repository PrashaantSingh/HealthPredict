import { predictHeart } from "../services/mlService.js";

export async function heartController(req, res) {
  try {
    const prediction = await predictHeart(req.body);
    res.json(prediction);
  } catch (err) {
    console.error("Heart prediction error:", err);
    res.status(500).json({ error: "Failed to get prediction" });
  }
}
