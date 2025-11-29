// Lightweight model service that simulates predictions.
// Replace with TensorFlow.js or API calls for production models.

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const modelService = {
  predict: async (disease, features) => {
    // Simulate latency
    await sleep(500 + Math.random() * 400);

    // Very simple heuristics for demo only
    if (disease === "diabetes") {
      // features: glucose, bmi, age
      const score =
        (Number(features.glucose || 0) / 200) * 0.6 +
        (Number(features.bmi || 0) / 50) * 0.3 +
        (Number(features.age || 0) / 120) * 0.1;
      const prob = Math.max(0, Math.min(1, score));
      return {
        label: prob > 0.35 ? "Likely Diabetes" : "Unlikely Diabetes",
        probability: prob,
      };
    }

    if (disease === "heart") {
      // features: age, cholesterol, trestbps (blood pressure)
      const score =
        (Number(features.age || 0) / 120) * 0.4 +
        (Number(features.cholesterol || 0) / 300) * 0.35 +
        (Number(features.trestbps || 0) / 200) * 0.25;
      const prob = Math.max(0, Math.min(1, score));
      return {
        label:
          prob > 0.4 ? "Higher Heart Disease Risk" : "Lower Heart Disease Risk",
        probability: prob,
      };
    }

    if (disease === "parkinsons") {
      // features: mdvp_fo, jitter, shimmer (example features)
      const score =
        (Number(features.mdvp_fo || 0) / 300) * 0.4 +
        (Number(features.jitter || 0) / 1) * 0.3 +
        (Number(features.shimmer || 0) / 1) * 0.3;
      const prob = Math.max(0, Math.min(1, score));
      return {
        label: prob > 0.25 ? "Possible Parkinson's" : "Unlikely Parkinson's",
        probability: prob,
      };
    }

    throw new Error("Unknown disease model: " + String(disease));
  },
};

export default modelService;
