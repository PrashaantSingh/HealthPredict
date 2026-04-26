import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalStore from "../store/globalStore";

export default function Results() {
  const {
    predictionHistory,
    historyLoading,
    historyError,
    fetchPredictionHistory,
    clearPredictionHistory,
  } = useGlobalStore();

  const handleClearHistory = async () => {
    await clearPredictionHistory();
  };

  useEffect(() => {
    fetchPredictionHistory({ limit: 10 }).catch(() => {});
  }, [fetchPredictionHistory]);

  const diseaseNameMap = {
    diabetes: "Diabetes",
    heart: "Heart Disease",
    parkinson: "Parkinson's",
    parkinsons: "Parkinson's",
  };

  const formatInputKey = (key) =>
    key
      .replace(/_/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold text-gray-900">Results</h2>
            <Link
              to="/predictions/diabetes"
              className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Back To Predictions
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchPredictionHistory({ limit: 10 })}
              className="px-3 py-1.5 text-sm rounded-md border border-gray-300 bg-white hover:bg-gray-50"
            >
              Refresh
            </button>
            <button
              onClick={handleClearHistory}
              disabled={historyLoading || predictionHistory.length === 0}
              className="px-3 py-1.5 text-sm rounded-md border border-red-200 text-red-700 bg-white hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear History
            </button>
          </div>
        </div>

        {historyLoading ? (
          <p className="text-sm text-gray-600">Loading history...</p>
        ) : historyError ? (
          <p className="text-sm text-red-600">{historyError}</p>
        ) : predictionHistory.length === 0 ? (
          <p className="text-sm text-gray-600">
            No saved predictions yet. Run a prediction to see it here.
          </p>
        ) : (
          <ul className="space-y-3">
            {predictionHistory.map((item) => {
              const isPositive = item?.result?.prediction === 1;
              return (
                <li
                  key={item.id}
                  className="rounded-lg border bg-white px-4 py-3 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {diseaseNameMap[item.disease] || item.disease}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>

                    {item.input && typeof item.input === "object" && (
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                        {Object.entries(item.input).map(([key, value]) => (
                          <p
                            key={`${item.id}-${key}`}
                            className="text-xs text-gray-700"
                          >
                            <span className="font-medium text-gray-800">
                              {formatInputKey(key)}:
                            </span>{" "}
                            {String(value)}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>

                  <div
                    className={`text-sm font-semibold ${
                      isPositive ? "text-red-700" : "text-emerald-700"
                    }`}
                  >
                    {isPositive ? "Positive" : "Negative"}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
