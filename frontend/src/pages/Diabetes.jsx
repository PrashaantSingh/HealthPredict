import Navbar from "../components/Navbar";
import PredictionForm from "../components/PredictionForm";

export default function Diabetes() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <PredictionForm disease="diabetes" />
      </div>
    </div>
  );
}
