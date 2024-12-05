import Logo from "../../components/Logo/Logo";
import SignInForm from "../../components/SignInForm/SignInForm";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import { NavLink } from "react-router-dom";
import css from "./SignInPage.module.css";
import { useMediaQuery } from "react-responsive";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import {
  selectAuthError,
  selectAuthIsLoggedIn,
} from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { useLanguage } from "../../locales/langContext.jsx";

const SignInPage = () => {
  const { t } = useLanguage();
  const isDesktop = useMediaQuery({ minWidth: 1440 });
  const error = useSelector(selectAuthError);
  const successLoggedIn = useSelector(selectAuthIsLoggedIn);

  return (
    <Section>
      <Container className={css.signin}>
        <Logo className={css.title} />
        <div className={css.signInContainer}>
          <SignInForm />
        </div>
        <div className={css.descContainer}>
          <p className={css.desc}>
            {t("DontHaveAcc")}{" "}
            <NavLink to="/signup" className={css.signup}>
              {t("SignUp")}
            </NavLink>{" "}
          </p>
        </div>
      </Container>
      {isDesktop && <AdvantagesSection className={css.advContainer} />}
      {error &&
        iziToast.error({
          title: "Error",
          message: error,
          titleColor: "#ef5050",
          messageColor: "#ef5050",
          displayMode: 1,
          position: "topRight",
          maxWidth: "400px",
        })}
      {successLoggedIn &&
        iziToast.success({
          title: "Success",
          message: "Successfully logged user",
          displayMode: 1,
          position: "topRight",
          maxWidth: "400px",
        })}
    </Section>
  );
};

export default SignInPage;
