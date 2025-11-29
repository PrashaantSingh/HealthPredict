import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Predictions() {
  const diseases = [
    { id: "diabetes", name: "Diabetes" },
    { id: "heart", name: "Heart Disease" },
    { id: "parkinsons", name: "Parkinson's" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Predictions
        </h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {diseases.map((d) => (
            <li key={d.id} className="bg-white rounded-lg p-5 border">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {d.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Run a quick prediction demo.
                  </p>
                </div>
                <div>
                  <Link
                    to={`/predictions/${d.id}`}
                    className="inline-flex items-center px-3 py-1 rounded-md bg-emerald-600 text-white"
                  >
                    Try
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
