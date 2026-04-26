import { predictDiabetes } from "../services/mlService.js";
import { appendPrediction } from "../services/predictionStore.js";

export async function diabetesController(req, res) {
  try {
    const prediction = await predictDiabetes(req.body);
    await appendPrediction({
      disease: "diabetes",
      input: req.body,
      result: prediction,
    });
    res.json(prediction);
  } catch (err) {
    console.error("Diabetes prediction error:", err);
    res.status(500).json({ error: "Failed to get prediction" });
  }
}
