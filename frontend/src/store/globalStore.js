import { create } from "zustand";
const API = import.meta.env.VITE_API_URL;

const useGlobalStore = create((set) => ({
  appName: "Disease Predictor",
  lastPrediction: null,
  setLastPrediction: (p) => set({ lastPrediction: p }),
  predict: async (disease, data) => {
    try {
      const res = await fetch(`${API}/api/${disease}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });

      return await res.json();
    } catch (error) {
      throw new Error(error);
    }
  },
}));

export default useGlobalStore;
