import SignUpForm from "../../components/SignUpForm/SignUpForm";
import Logo from "../../components/Logo/Logo";
import { NavLink } from "react-router-dom";
import css from "./SignUpPage.module.css";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import { useMediaQuery } from "react-responsive";
import { useLanguage } from "../../locales/langContext.jsx";

const SignUpPage = () => {
  const { t } = useLanguage();
  const isDesktop = useMediaQuery({ minWidth: 1440 });
  return (
    <section className={css.section}>
      <div className={css.formWrapper}>
        <Logo className={css.logo} />
        <h1 className={css.title}>{t("SignUp")}</h1>
        <SignUpForm />
        <p className={css.text}>
          {t("AlreadyHave")}{" "}
          <NavLink to="/signin" className={css.link}>
            {t("SignIn")}
          </NavLink>
        </p>
      </div>
      {isDesktop && <AdvantagesSection className={css.advantagesSection} />}
    </section>
  );
};

export default SignUpPage;
