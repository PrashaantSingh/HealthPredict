// src/config/diseaseFields.js

export const diseaseFields = {
  diabetes: [
    { key: "age", label: "Age", type: "number", min: 1 },

    {
      key: "gender",
      label: "Gender",
      type: "select",
      options: ["male", "female"],
    },

    {
      key: "hypertension",
      label: "Hypertension",
      type: "select",
      options: [
        { label: "Yes", value: 1 },
        { label: "No", value: 0 },
      ],
    },

    {
      key: "heart_disease",
      label: "Heart Disease",
      type: "select",
      options: [
        { label: "Yes", value: 1 },
        { label: "No", value: 0 },
      ],
    },

    {
      key: "smoking_history",
      label: "Smoking History",
      type: "select",
      fullWidth: true,
      options: ["never", "current", "former", "ever", "not current"],
    },

    { key: "bmi", label: "BMI", type: "number", step: "0.1" },

    {
      key: "HbA1c_level",
      label: "HbA1c Level (%)",
      type: "number",
      step: "0.1",
    },

    {
      key: "blood_glucose_level",
      label: "Blood Glucose Level (mg/dL)",
      type: "number",
      fullWidth: true,
    },
  ],

  heart: [
    { key: "age", label: "Age", type: "number" },

    {
      key: "sex",
      label: "Sex",
      type: "select",
      options: [
        { label: "Male", value: 1 },
        { label: "Female", value: 0 },
      ],
    },

    { key: "cp", label: "Chest Pain Type", type: "number" },
    { key: "trestbps", label: "Resting Blood Pressure", type: "number" },
    { key: "chol", label: "Cholesterol", type: "number" },

    {
      key: "fbs",
      label: "Fasting Blood Sugar > 120 mg/dl",
      type: "select",
      options: [
        { label: "Yes", value: 1 },
        { label: "No", value: 0 },
      ],
    },

    { key: "restecg", label: "Rest ECG", type: "number" },
    { key: "thalach", label: "Max Heart Rate", type: "number" },

    {
      key: "exang",
      label: "Exercise Induced Angina",
      type: "select",
      options: [
        { label: "Yes", value: 1 },
        { label: "No", value: 0 },
      ],
    },

    { key: "oldpeak", label: "Oldpeak", type: "number", step: "0.1" },
    { key: "slope", label: "Slope", type: "number" },

    {
      key: "ca",
      label: "Major Vessels (0–3)",
      type: "number",
      fullWidth: true,
    },

    { key: "thal", label: "Thal", type: "number", fullWidth: true },
  ],

  parkinsons: [
    {
      key: "MDVP:Fo(Hz)",
      label: "MDVP Fo (Hz)",
      type: "number",
      step: "0.001",
    },
    { key: "MDVP:Fhi(Hz)", label: "Highest Frequency", type: "number" },
    { key: "MDVP:Flo(Hz)", label: "Lowest Frequency", type: "number" },

    { key: "MDVP:Jitter(%)", label: "Jitter (%)", type: "number" },
    { key: "MDVP:Jitter(Abs)", label: "Jitter (Abs)", type: "number" },
    { key: "MDVP:RAP", label: "RAP", type: "number" },
    { key: "MDVP:PPQ", label: "PPQ", type: "number" },
    { key: "Jitter:DDP", label: "DDP", type: "number" },
    { key: "MDVP:Shimmer", label: "Shimmer", type: "number" },
    { key: "MDVP:Shimmer(dB)", label: "Shimmer (dB)", type: "number" },
    { key: "Shimmer:APQ3", label: "APQ3", type: "number" },
    { key: "Shimmer:APQ5", label: "APQ5", type: "number" },
    { key: "MDVP:APQ", label: "APQ", type: "number" },
    { key: "Shimmer:DDA", label: "DDA", type: "number" },

    { key: "NHR", label: "NHR", type: "number", fullWidth: true },
    { key: "HNR", label: "HNR", type: "number", fullWidth: true },

    { key: "RPDE", label: "RPDE", type: "number" },
    { key: "DFA", label: "DFA", type: "number" },

    { key: "spread1", label: "Spread1", type: "number", fullWidth: true },
    { key: "spread2", label: "Spread2", type: "number", fullWidth: true },

    { key: "D2", label: "D2", type: "number" },
    { key: "PPE", label: "PPE", type: "number" },
  ],
};
