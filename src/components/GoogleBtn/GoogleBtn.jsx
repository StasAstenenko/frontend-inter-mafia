import { instance } from "../../redux/auth/operations";
import { FcGoogle } from "react-icons/fc";
import css from "./GoogleBtn.module.css";

const GoogleBtn = () => {
  const URL = instance.baseURL;
  return (
    <a className={css.googleBtn} href={`${URL}/users/google`} target="_blank">
      <FcGoogle className={css.googleIcon} />
      Sign In with Google
    </a>
  );
};

export default GoogleBtn;
