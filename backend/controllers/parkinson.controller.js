import { predictParkinson } from "../services/mlService.js";
import { appendPrediction } from "../services/predictionStore.js";

export async function parkinsonController(req, res) {
  try {
    const prediction = await predictParkinson(req.body);
    await appendPrediction({
      disease: "parkinson",
      input: req.body,
      result: prediction,
    });
    res.json(prediction);
  } catch (err) {
    console.error("Parkinson prediction error:", err);
    // console.log(err);
    res.status(500).json({ error: "Failed to get prediction" });
  }
}
