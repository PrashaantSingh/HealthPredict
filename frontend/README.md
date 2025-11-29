# Disease Prediction Frontend (Demo)

This project is a small React + Vite demo converted into a multi-disease prediction frontend. It includes simple forms and a lightweight `modelService` that simulates predictions for:

- Diabetes
- Heart disease
- Parkinson's

This is a UI demo — replace `src/services/modelService.js` with real ML inference (TensorFlow.js or backend API) to use trained models.

Run locally:

```powershell
npm install
npm run dev
```

Files of interest:

- `src/pages/Predictions.jsx` — list of disease demos
- `src/pages/Diabetes.jsx`, `src/pages/Heart.jsx`, `src/pages/Parkinsons.jsx` — per-disease forms
- `src/components/PredictionForm.jsx` — reusable form component
- `src/services/modelService.js` — simulated model service (swap for real models)

If you want, I can integrate TensorFlow.js, add file uploads, or wire the forms to a backend inference API.
