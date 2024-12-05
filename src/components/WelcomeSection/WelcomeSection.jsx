import Logo from "../Logo/Logo";
import { NavLink } from "react-router-dom";
import styles from "./WelcomeSection.module.css";
import { useLanguage } from "../../locales/langContext.jsx";

const WelcomeSection = ({ className = "" }) => {
  const { t } = useLanguage();
  return (
    <div className={`${styles.welcomeSection} ${className}`}>
      <Logo className={styles.logo} />
      <div className={styles.contentWrapper}>
        <div className={styles.headersWrapper}>
          <h1 className={styles.title}>{t("WaterTracker")}</h1>
          <h2 className={styles.subtitle}>{t("RecordDaily")}</h2>
        </div>
        <div className={styles.buttonsWrapper}>
          <NavLink
            to="/signup"
            className={`${styles.btn} ${styles.btnPrimary}`}
          >
            {t("TryTracker")}
          </NavLink>
          <NavLink
            to="/signin"
            className={`${styles.btn} ${styles.btnSecondary}`}
          >
            {t("SignIn")}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
