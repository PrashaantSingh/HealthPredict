import { useState, useMemo, useEffect } from "react";
import { diseaseFields } from "../config/diseaseFields";
import ResultCard from "./ResultCard";
import useGlobalStore from "../store/globalStore";

export default function DiseaseForm({ disease }) {
  const fields = useMemo(() => diseaseFields[disease] || [], [disease]);
  const { predict } = useGlobalStore();

  const initial = useMemo(
    () => fields.reduce((acc, f) => ({ ...acc, [f.key]: "" }), {}),
    [fields],
  );

  const [values, setValues] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  useEffect(() => {
    setValues(initial);
    setResult(null);
    setFormError("");
    setFieldErrors({});
    setTouchedFields({});
  }, [initial]);

  const getFieldError = (field, rawValue) => {
    const value = rawValue ?? "";

    if (value === "") {
      return "";
    }

    if (field.type === "select") {
      const allowed = field.options.map((opt) => String(opt?.value ?? opt));
      if (!allowed.includes(String(value))) {
        return `${field.label} is invalid`;
      }
      return "";
    }

    if (field.type === "number") {
      const num = Number(value);

      if (!Number.isFinite(num)) {
        return `${field.label} must be a number`;
      }

      if (typeof field.min === "number" && num < field.min) {
        return `${field.label} must be at least ${field.min}`;
      }

      if (typeof field.max === "number" && num > field.max) {
        return `${field.label} must be at most ${field.max}`;
      }
    }

    return "";
  };

  const handleChange = (key, val) => {
    setFormError("");
    const field = fields.find((f) => f.key === key);

    setValues((prev) => ({ ...prev, [key]: val }));
    setTouchedFields((prev) => ({ ...prev, [key]: true }));

    if (field) {
      const error = getFieldError(field, val);
      setFieldErrors((prev) => ({ ...prev, [key]: error }));
    }
  };

  const handleBlur = (key) => {
    const field = fields.find((f) => f.key === key);
    if (!field) return;

    setTouchedFields((prev) => ({ ...prev, [key]: true }));
    const error = getFieldError(field, values[key]);
    setFieldErrors((prev) => ({ ...prev, [key]: error }));
  };

  const handleClearForm = () => {
    setValues(initial);
    setResult(null);
    setFormError("");
    setFieldErrors({});
    setTouchedFields({});
  };

  const normalizeDiabetesPayload = () => {
    const payload = { ...values };

    const numericKeys = ["age", "bmi", "HbA1c_level", "blood_glucose_level"];
    for (const key of numericKeys) {
      const value = Number(payload[key]);
      const field = fields.find((f) => f.key === key);

      if (!Number.isFinite(value)) {
        throw new Error(`Invalid ${field?.label || key}`);
      }

      if (typeof field?.min === "number" && value < field.min) {
        throw new Error(`${field.label} must be at least ${field.min}`);
      }

      if (typeof field?.max === "number" && value > field.max) {
        throw new Error(`${field.label} must be at most ${field.max}`);
      }

      payload[key] = value;
    }

    if (!["Male", "Female"].includes(payload.gender)) {
      throw new Error("Gender must be Male or Female");
    }

    if (
      ![
        "never",
        "current",
        "former",
        "ever",
        "not current",
        "No Info",
      ].includes(payload.smoking_history)
    ) {
      throw new Error("Smoking History value is invalid");
    }

    const asBinary = ["hypertension", "heart_disease"];
    for (const key of asBinary) {
      const value = Number(payload[key]);
      if (![0, 1].includes(value)) {
        throw new Error(`${key.replace("_", " ")} must be 0 or 1`);
      }
      payload[key] = value;
    }

    return payload;
  };

  const normalizeHeartPayload = () => {
    const payload = { ...values };

    const numericKeys = ["age", "trestbps", "chol", "thalach", "oldpeak"];
    for (const key of numericKeys) {
      const value = Number(payload[key]);
      const field = fields.find((f) => f.key === key);

      if (!Number.isFinite(value)) {
        throw new Error(`Invalid ${field?.label || key}`);
      }

      if (typeof field?.min === "number" && value < field.min) {
        throw new Error(`${field.label} must be at least ${field.min}`);
      }

      if (typeof field?.max === "number" && value > field.max) {
        throw new Error(`${field.label} must be at most ${field.max}`);
      }

      payload[key] = value;
    }

    const codedFields = {
      sex: [0, 1],
      cp: [0, 1, 2, 3],
      fbs: [0, 1],
      restecg: [0, 1, 2],
      exang: [0, 1],
      slope: [0, 1, 2],
      ca: [0, 1, 2, 3],
      thal: [0, 1, 2, 3],
    };

    for (const [key, allowed] of Object.entries(codedFields)) {
      const value = Number(payload[key]);
      if (!allowed.includes(value)) {
        throw new Error(`${key} value is invalid`);
      }
      payload[key] = value;
    }

    return payload;
  };

  const normalizeParkinsonPayload = () => {
    const payload = { ...values };

    const numericKeys = fields.map((f) => f.key);
    for (const key of numericKeys) {
      const value = Number(payload[key]);
      const field = fields.find((f) => f.key === key);

      if (!Number.isFinite(value)) {
        throw new Error(`Invalid ${field?.label || key}`);
      }

      if (typeof field?.min === "number" && value < field.min) {
        throw new Error(`${field.label} must be at least ${field.min}`);
      }

      if (typeof field?.max === "number" && value > field.max) {
        throw new Error(`${field.label} must be at most ${field.max}`);
      }

      payload[key] = value;
    }

    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError("");
    setResult(null);

    const nextTouched = fields.reduce(
      (acc, field) => ({ ...acc, [field.key]: true }),
      {},
    );
    setTouchedFields(nextTouched);

    const nextFieldErrors = fields.reduce((acc, field) => {
      const error = getFieldError(field, values[field.key]);
      return { ...acc, [field.key]: error };
    }, {});
    setFieldErrors(nextFieldErrors);

    const hasInputErrors = Object.values(nextFieldErrors).some(Boolean);
    if (hasInputErrors) {
      setLoading(false);
      return;
    }

    let payload = values;

    try {
      if (disease === "diabetes") {
        payload = normalizeDiabetesPayload();
      } else if (disease === "heart") {
        payload = normalizeHeartPayload();
      } else if (disease === "parkinson") {
        payload = normalizeParkinsonPayload();
      }
    } catch (validationError) {
      setFormError(validationError.message || "Invalid input values");
      setLoading(false);
      return;
    }

    console.log("input values", payload);

    try {
      const response = await predict(disease, payload);
      console.log("prediction result: ", response);
      setResult(response);
    } catch (err) {
      setResult({ error: String(err) });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500";

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 capitalize">
        {disease} Prediction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {formError && (
          <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {formError}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fields.map((f) => (
            <div
              key={f.key}
              className={f.fullWidth ? "md:col-span-3" : "md:col-span-1"}
            >
              <label className="text-sm font-medium text-gray-700">
                {f.label}
              </label>

              {f.type === "select" ? (
                <select
                  className={`${inputClass} bg-white ${
                    touchedFields[f.key] && fieldErrors[f.key]
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                  value={values[f.key]}
                  onChange={(e) => handleChange(f.key, e.target.value)}
                  onBlur={() => handleBlur(f.key)}
                  required
                >
                  <option value="">Select</option>

                  {f.options.map((opt) => (
                    <option key={opt.value ?? opt} value={opt.value ?? opt}>
                      {opt.label ?? opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={f.type}
                  step={f.step}
                  min={f.min}
                  max={f.max}
                  className={`${inputClass} ${
                    touchedFields[f.key] && fieldErrors[f.key]
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                  placeholder={f.placeholder}
                  value={values[f.key]}
                  onChange={(e) => handleChange(f.key, e.target.value)}
                  onBlur={() => handleBlur(f.key)}
                  required
                />
              )}

              {touchedFields[f.key] && fieldErrors[f.key] && (
                <p className="text-xs text-red-600 mt-1">
                  {fieldErrors[f.key]}
                </p>
              )}

              {f.help && <p className="text-xs text-gray-400 mt-1">{f.help}</p>}
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleClearForm}
            className="mr-3 px-6 py-2.5 rounded-md text-sm font-semibold border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
          >
            Clear
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2.5 rounded-md text-white text-sm font-semibold transition ${
              loading
                ? "bg-emerald-300 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
        </div>
      </form>

      {result && <ResultCard result={result} />}
    </div>
  );
}
