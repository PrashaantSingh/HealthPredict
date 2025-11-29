import { predictParkinson } from "../services/mlService.js";

export async function parkinsonController(req, res) {
  try {
    const prediction = await predictParkinson(req.body);
    res.json(prediction);
  } catch (err) {
    console.error("Parkinson prediction error:", err);
    // console.log(err);
    res.status(500).json({ error: "Failed to get prediction" });
  }
}
