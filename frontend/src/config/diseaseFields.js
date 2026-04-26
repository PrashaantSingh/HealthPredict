// src/config/diseaseFields.js

export const diseaseFields = {
  diabetes: [
    { key: "age", label: "Age", type: "number", min: 1, max: 120 },

    {
      key: "gender",
      label: "Gender",
      type: "select",
      options: [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
      ],
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
      options: ["never", "current", "former", "ever", "not current", "No Info"],
    },

    { key: "bmi", label: "BMI", type: "number", step: "0.1", min: 10, max: 80 },

    {
      key: "HbA1c_level",
      label: "HbA1c Level (%)",
      type: "number",
      step: "0.1",
      min: 3,
      max: 20,
    },

    {
      key: "blood_glucose_level",
      label: "Blood Glucose Level (mg/dL)",
      type: "number",
      min: 40,
      max: 600,
      fullWidth: true,
    },
  ],

  heart: [
    { key: "age", label: "Age", type: "number", min: 1, max: 120 },

    {
      key: "sex",
      label: "Sex",
      type: "select",
      options: [
        { label: "Male", value: 1 },
        { label: "Female", value: 0 },
      ],
    },

    {
      key: "cp",
      label: "Chest Pain Type",
      type: "select",
      options: [
        { label: "Type 0", value: 0 },
        { label: "Type 1", value: 1 },
        { label: "Type 2", value: 2 },
        { label: "Type 3", value: 3 },
      ],
    },
    {
      key: "trestbps",
      label: "Resting Blood Pressure",
      type: "number",
      min: 60,
      max: 260,
    },
    {
      key: "chol",
      label: "Cholesterol",
      type: "number",
      min: 80,
      max: 700,
    },

    {
      key: "fbs",
      label: "Fasting Blood Sugar > 120 mg/dl",
      type: "select",
      options: [
        { label: "Yes", value: 1 },
        { label: "No", value: 0 },
      ],
    },

    {
      key: "restecg",
      label: "Rest ECG",
      type: "select",
      options: [
        { label: "0", value: 0 },
        { label: "1", value: 1 },
        { label: "2", value: 2 },
      ],
    },
    {
      key: "thalach",
      label: "Max Heart Rate",
      type: "number",
      min: 40,
      max: 240,
    },

    {
      key: "exang",
      label: "Exercise Induced Angina",
      type: "select",
      options: [
        { label: "Yes", value: 1 },
        { label: "No", value: 0 },
      ],
    },

    {
      key: "oldpeak",
      label: "Oldpeak",
      type: "number",
      step: "0.1",
      min: 0,
      max: 10,
    },
    {
      key: "slope",
      label: "Slope",
      type: "select",
      options: [
        { label: "0", value: 0 },
        { label: "1", value: 1 },
        { label: "2", value: 2 },
      ],
    },

    {
      key: "ca",
      label: "Major Vessels (0–3)",
      type: "select",
      options: [
        { label: "0", value: 0 },
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
      ],
      fullWidth: true,
    },

    {
      key: "thal",
      label: "Thal",
      type: "select",
      options: [
        { label: "0", value: 0 },
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
      ],
      fullWidth: true,
    },
  ],

  parkinson: [
    {
      key: "MDVP:Fo(Hz)",
      label: "MDVP Fo (Hz)",
      type: "number",
      step: "0.001",
      min: 50,
      max: 600,
    },
    {
      key: "MDVP:Fhi(Hz)",
      label: "Highest Frequency",
      type: "number",
      min: 50,
      max: 700,
    },
    {
      key: "MDVP:Flo(Hz)",
      label: "Lowest Frequency",
      type: "number",
      min: 10,
      max: 500,
    },

    {
      key: "MDVP:Jitter(%)",
      label: "Jitter (%)",
      type: "number",
      min: 0,
      max: 1,
    },
    {
      key: "MDVP:Jitter(Abs)",
      label: "Jitter (Abs)",
      type: "number",
      min: 0,
      max: 1,
    },
    { key: "MDVP:RAP", label: "RAP", type: "number", min: 0, max: 1 },
    { key: "MDVP:PPQ", label: "PPQ", type: "number", min: 0, max: 1 },
    { key: "Jitter:DDP", label: "DDP", type: "number", min: 0, max: 1 },
    { key: "MDVP:Shimmer", label: "Shimmer", type: "number", min: 0, max: 2 },
    {
      key: "MDVP:Shimmer(dB)",
      label: "Shimmer (dB)",
      type: "number",
      min: 0,
      max: 5,
    },
    { key: "Shimmer:APQ3", label: "APQ3", type: "number", min: 0, max: 1 },
    { key: "Shimmer:APQ5", label: "APQ5", type: "number", min: 0, max: 1 },
    { key: "MDVP:APQ", label: "APQ", type: "number", min: 0, max: 1 },
    { key: "Shimmer:DDA", label: "DDA", type: "number", min: 0, max: 2 },

    {
      key: "NHR",
      label: "NHR",
      type: "number",
      min: 0,
      max: 2,
      fullWidth: true,
    },
    {
      key: "HNR",
      label: "HNR",
      type: "number",
      min: 0,
      max: 50,
      fullWidth: true,
    },

    { key: "RPDE", label: "RPDE", type: "number", min: 0, max: 1 },
    { key: "DFA", label: "DFA", type: "number", min: 0, max: 2 },

    {
      key: "spread1",
      label: "Spread1",
      type: "number",
      min: -10,
      max: 0,
      fullWidth: true,
    },
    {
      key: "spread2",
      label: "Spread2",
      type: "number",
      min: 0,
      max: 2,
      fullWidth: true,
    },

    { key: "D2", label: "D2", type: "number", min: 0, max: 6 },
    { key: "PPE", label: "PPE", type: "number", min: 0, max: 1 },
  ],
};
