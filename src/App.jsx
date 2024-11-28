import { lazy, Suspense } from "react";
import Loader from "./components/Loader/Loader";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import { Route, Routes } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { selectAuthIsRefreshing } from "./redux/auth/selectors";
// import { apiRefresh } from "./redux/auth/operations";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage/SignUpPage"));
const TrackerPage = lazy(() => import("./pages/TrackerPage/TrackerPage"));

function App() {
  // const dispatch = useDispatch();
  // const refresh = useSelector(selectAuthIsRefreshing);

  // useEffect(() => {
  //   dispatch(apiRefresh());
  // }, [dispatch]);

  return (
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
