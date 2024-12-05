import { useLanguage } from "../../locales/langContext.jsx";
import css from "./LangSwitch.module.css";

const LangSwitch = () => {
  const { changeLanguage, language } = useLanguage();

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
  };

  return (
    <div className={css.languageSwitcher}>
      <button
        className={`${css.languageButton} ${
          language === "en" ? css.active : ""
        }`}
        onClick={() => handleLanguageChange("en")}
      >
        EN
      </button>
      <button
        className={`${css.languageButton} ${
          language === "ua" ? css.active : ""
        }`}
        onClick={() => handleLanguageChange("ua")}
      >
        UA
      </button>
    </div>
  );
};

export default LangSwitch;
