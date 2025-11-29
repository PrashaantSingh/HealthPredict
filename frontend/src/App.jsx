import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Predictions from "./pages/Predictions";
import Diabetes from "./pages/Diabetes";
import Heart from "./pages/Heart";
import Parkinsons from "./pages/Parkinsons";
import useAuthStore from "./store/authStore";
import { useEffect } from "react";

export default function App() {
  const { user, me, initialized } = useAuthStore();

  // useEffect(() => {
  //   me();
  // }, [me]);

  // if (!initialized) return null;

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route
          path={"/"}
          // element={user ? <Home /> : <Navigate to={"/login"} />}
          element={<Home />}
        /> */}
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/login"} element={<Login />} />
        {/* <Route path={"/predictions"} element={<Predictions />} /> */}
        <Route path={"/"} element={<Predictions />} />
        <Route path={"/predictions/diabetes"} element={<Diabetes />} />
        <Route path={"/predictions/heart"} element={<Heart />} />
        <Route path={"/predictions/parkinsons"} element={<Parkinsons />} />
      </Routes>
    </BrowserRouter>
  );
}
