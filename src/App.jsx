import { lazy, Suspense, useEffect } from "react";
import Loader from "./components/Loader/Loader";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import { Route, Routes } from "react-router-dom";
import { apiRefresh } from "./redux/auth/operations.js";
import {selectIsRefreshing } from "./redux/auth/selectors.js";
import { useDispatch, useSelector } from "react-redux";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage/SignUpPage"));
const TrackerPage = lazy(() => import("./pages/TrackerPage/TrackerPage"));

function App() {
  const dispatch = useDispatch();
const isRefreshing = useSelector(selectIsRefreshing)
  useEffect(() => {
    // Виклик оновлення токена при завантаженні сторінки
    dispatch(apiRefresh());
  }, [dispatch]);


  return isRefreshing ? (
    <Loader />
  ) : (
    <main>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/tracker"
            element={<PrivateRoute component={<TrackerPage />} />}
          />
          <Route
            path="/signin"
            element={<RestrictedRoute component={<SignInPage />} />}
          />
          <Route
            path="/signup"
            element={<RestrictedRoute component={<SignUpPage />} />}
          />
        </Routes>
      </Suspense>
    </main>
  );
}

export default App;
