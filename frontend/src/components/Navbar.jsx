import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to={"/"} className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-emerald-600 flex items-center justify-center text-white font-bold">
            D
          </div>
          <h1 className="text-lg font-semibold text-gray-900">
            Disease Predictor
          </h1>
        </Link>

        <nav>
          <ul className="flex items-center gap-6 text-sm">
            {/* <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-emerald-600 font-semibold"
                    : "text-gray-700 hover:text-emerald-600"
                }
              >
                Home
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to="/predictions"
                className={({ isActive }) =>
                  isActive
                    ? "text-emerald-600 font-semibold"
                    : "text-gray-700 hover:text-emerald-600"
                }
              >
                Predictions
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/results"
                className={({ isActive }) =>
                  isActive
                    ? "text-emerald-600 font-semibold"
                    : "text-gray-700 hover:text-emerald-600"
                }
              >
                Results
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-emerald-600 font-semibold"
                    : "text-gray-700 hover:text-emerald-600"
                }
              >
                Login
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive
                    ? "text-emerald-600 font-semibold"
                    : "text-gray-700 hover:text-emerald-600"
                }
              >
                Signup
              </NavLink>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
}
