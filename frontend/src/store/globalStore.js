import { create } from "zustand";
const API = import.meta.env.VITE_API_URL;
const API_BASE = API || "";

const useGlobalStore = create((set) => ({
  appName: "Disease Predictor",
  lastPrediction: null,
  predictionHistory: [],
  historyLoading: false,
  historyError: null,
  setLastPrediction: (p) => set({ lastPrediction: p }),
  predict: async (disease, data) => {
    try {
      const res = await fetch(`${API_BASE}/api/${disease}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Prediction request failed");
      }

      const result = await res.json();
      set({ lastPrediction: { disease, input: data, result } });
      return result;
    } catch (error) {
      throw new Error(error?.message || "Prediction failed");
    }
  },
  fetchPredictionHistory: async (params = {}) => {
    set({ historyLoading: true, historyError: null });

    try {
      const query = new URLSearchParams();

      if (params.disease) query.set("disease", params.disease);
      if (params.limit) query.set("limit", String(params.limit));

      const suffix = query.toString() ? `?${query.toString()}` : "";
      const response = await fetch(`${API_BASE}/api/predictions${suffix}`);

      if (!response.ok) {
        throw new Error("Failed to load prediction history");
      }

      const data = await response.json();
      const items = Array.isArray(data.items) ? data.items : [];
      set({ predictionHistory: items, historyError: null });
      return items;
    } catch (error) {
      set({
        historyError: error?.message || "Failed to load prediction history",
      });
      return [];
    } finally {
      set({ historyLoading: false });
    }
  },
  clearPredictionHistory: async () => {
    set({ historyLoading: true, historyError: null });

    try {
      const response = await fetch(`${API_BASE}/api/predictions`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to clear prediction history");
      }

      set({ predictionHistory: [], historyError: null });
      return true;
    } catch (error) {
      set({
        historyError: error?.message || "Failed to clear prediction history",
      });
      return false;
    } finally {
      set({ historyLoading: false });
    }
  },
}));

export default useGlobalStore;
