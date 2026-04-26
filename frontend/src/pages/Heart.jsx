import PredictionForm from "../components/PredictionForm";
import DiseaseTabs from "../components/DiseaseTabs";

export default function Heart() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-6">
          <DiseaseTabs />
        </div>
        <PredictionForm disease="heart" />
      </div>
    </div>
  );
}
