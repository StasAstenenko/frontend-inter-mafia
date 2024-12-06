import { useSelector } from "react-redux";
import {
  selectAuthIsLoading,
  selectAuthIsLoggedIn,
  // selectAuthIsRefreshing,
  selectAuthIsRegisteredSuccess,
} from "../../redux/auth/selectors";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Loader/Loader";
// import { replace } from "formik";

const RestrictedRoute = ({ component }) => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const isRegistered = useSelector(selectAuthIsRegisteredSuccess);
  const isLoading = useSelector(selectAuthIsLoading);
  const location = useLocation();

  if (isLoading) {
    return <Loader />;
  }
  if (isLoggedIn && location.pathname !== "/tracker") {
    return <Navigate to={"/tracker"} replace />;
  }
  if (isRegistered && location.pathname !== "/signin") {
    return <Navigate to={"/signin"} replace />;
  }

  return component;
};

export default RestrictedRoute;
