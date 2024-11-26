import { lazy, Suspense, useState } from "react";
import Loader from "./components/Loader/Loader";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import { Route, Routes } from "react-router-dom";
import Modal from "./modals/Modal/Modal";
import LogOutModal from "./modals/LogOutModal/LogOutModal";
// import DeleteWaterModal from "./modals/DeleteWaterModal/DeleteWaterModal";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage/SignUpPage"));
const TrackerPage = lazy(() => import("./pages/TrackerPage/TrackerPage"));

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
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
      <div className="modals">
        <div>
          <button onClick={openModal}>Open Modal</button>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <LogOutModal />
            {/* <DeleteWaterModal /> */}
          </Modal>
        </div>
      </div>
    </Suspense>
  );
}

export default App;
