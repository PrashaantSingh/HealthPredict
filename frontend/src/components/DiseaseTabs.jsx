import { NavLink } from "react-router-dom";

const tabs = [
  { label: "Diabetes", to: "/predictions/diabetes" },
  { label: "Heart", to: "/predictions/heart" },
  { label: "Parkinson's", to: "/predictions/parkinsons" },
];

export default function DiseaseTabs() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="rounded-full border border-gray-200 bg-white p-1.5 shadow-sm flex-1">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                `inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-50 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
      </div>

      <NavLink
        to="/results"
        className={({ isActive }) =>
          `inline-flex items-center justify-center rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
            isActive
              ? "border-emerald-600 bg-emerald-600 text-white"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`
        }
      >
        View Results
      </NavLink>
    </div>
  );
}
