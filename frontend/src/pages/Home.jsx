import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          Welcome to Disease Predictor
        </h1>
        <p className="text-gray-600 mb-8">
          A demo frontend for multiple disease prediction forms (Diabetes, Heart
          disease, Parkinson's). Use the Predictions page to try them out.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            to="/predictions"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md"
          >
            Go to Predictions
          </Link>
        </div>
      </div>
    </div>
  );
}
