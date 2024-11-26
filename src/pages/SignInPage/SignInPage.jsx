import Logo from "../../components/Logo/Logo";
import SignInForm from "../../components/SignInForm/SignInForm";
import { NavLink } from "react-router-dom";
import css from "./SignInPage.module.css";

const SignInPage = () => {
  return (
    <section className={css.signInSection}>
      <div className={css.container}>
        <Logo className={css.title} />
        <SignInForm />
        <div className={css.descContainer}>
          <p className={css.desc}>
            Don&#039;t have an account?{" "}
            <NavLink to="/signup" className={css.signup}>
              Sign Up
            </NavLink>{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
