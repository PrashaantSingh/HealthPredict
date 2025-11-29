export default function ResultCard({ result }) {
  if (result.error) {
    return (
      <div className="mt-4 p-4 rounded-md bg-red-50 border border-red-200 text-red-700">
        Error: {result.error}
      </div>
    );
  }

  const { prediction, probability } = result;

  // Convert prediction → user-friendly text
  const isPositive = prediction === 1;

  const label = isPositive ? "Positive" : "Negative";

  // Colors based on prediction
  const bgColor = isPositive
    ? "bg-red-50 border-red-200"
    : "bg-emerald-50 border-emerald-200";
  const textColor = isPositive ? "text-red-700" : "text-emerald-700";
  const titleColor = isPositive ? "text-red-900" : "text-emerald-900";

  return (
    <div className={`mt-4 p-4 rounded-md border ${bgColor}`}>
      <div className={`text-sm ${textColor}`}>Prediction Result</div>

      <div className={`mt-2 text-lg font-semibold ${titleColor}`}>{label}</div>

      {typeof probability === "number" && (
        <div className="text-sm text-gray-600">
          Confidence: {(probability * 100).toFixed(1)}%
        </div>
      )}
    </div>
  );
}
