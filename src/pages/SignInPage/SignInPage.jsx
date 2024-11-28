import Logo from "../../components/Logo/Logo";
import SignInForm from "../../components/SignInForm/SignInForm";
import { NavLink } from "react-router-dom";
import css from "./SignInPage.module.css";
import { useMediaQuery } from "react-responsive";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";

const SignInPage = () => {
  const isDesktop = useMediaQuery({ minWidth: 1440 });

  return (
    <div className={css.descContainer}>
      <section className={css.signInSection}>
        <div className={css.container}>
          <Logo className={css.title} />
          <div className={css.signInContainer}>
            <SignInForm />
          </div>
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
      {isDesktop && <AdvantagesSection className={css.advContainer} />}
    </div>
  );
};

export default SignInPage;
