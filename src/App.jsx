import { lazy, Suspense } from "react";
import { Loader } from "./components/Loader/Loader";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { RestrictedRoute } from "./components/RestrictedRoute/RestrictedRoute";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage/SignUpPage"));
const TrackerPage = lazy(() => import("./pages/TrackerPage/TrackerPage"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<TrackerPage />} />
        <Route
          path="/home"
          element={<PrivateRoute component={<HomePage />} />}
        />
        <Route
          path="/login"
          element={<RestrictedRoute component={<SignInPage />} />}
        />
        <Route
          path="/register"
          element={<RestrictedRoute component={<SignUpPage />} />}
        />
      </Routes>
    </Suspense>
  );
}

export default App;
