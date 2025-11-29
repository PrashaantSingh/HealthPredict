import { useState, useMemo } from "react";
import { diseaseFields } from "../config/diseaseFields";
import modelService from "../services/modelService";
import ResultCard from "./ResultCard";
import useGlobalStore from "../store/globalStore";

export default function DiseaseForm({ disease }) {
  const fields = diseaseFields[disease] || [];
  const { predict } = useGlobalStore();

  const initial = useMemo(
    () => fields.reduce((acc, f) => ({ ...acc, [f.key]: "" }), {}),
    [fields]
  );

  const [values, setValues] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (key, val) =>
    setValues((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    console.log("input values", values);

    try {
      const response = await predict(disease, values);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((f) => (
            <div key={f.key} className={f.fullWidth ? "md:col-span-2" : ""}>
              <label className="text-sm font-medium text-gray-700">
                {f.label}
              </label>

              {f.type === "select" ? (
                <select
                  className={`${inputClass} bg-white`}
                  value={values[f.key]}
                  onChange={(e) => handleChange(f.key, e.target.value)}
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
                  className={inputClass}
                  placeholder={f.placeholder}
                  value={values[f.key]}
                  onChange={(e) => handleChange(f.key, e.target.value)}
                  required
                />
              )}

              {f.help && <p className="text-xs text-gray-400 mt-1">{f.help}</p>}
            </div>
          ))}
        </div>

        <div className="flex justify-end">
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
