import SignUpForm from "../../components/SignUpForm/SignUpForm";
import Logo from "../../components/Logo/Logo";
import { NavLink } from "react-router-dom";
import css from "./SignUpPage.module.css";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import { useMediaQuery } from "react-responsive";

const SignUpPage = () => {
  const isDesktop = useMediaQuery({ minWidth: 1440 });
  return (
    <section className={css.section}>
      <div className={css.container}>
        <Logo className={css.logo} />
        <h1 className={css.title}>Sign Up</h1>
        <SignUpForm />
        <p className={css.text}>
          Already have account?{" "}
          <NavLink to="/signin" className={css.link}>
            Sign In
          </NavLink>
        </p>
      </div>
      {isDesktop && <AdvantagesSection className={css.advantagesSection} />}
    </section>
  );
};

export default SignUpPage;
