import Navbar from "../components/Navbar";
import PredictionForm from "../components/PredictionForm";

export default function Parkinsons() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <PredictionForm disease="parkinsons" />
      </div>
    </div>
  );
}
