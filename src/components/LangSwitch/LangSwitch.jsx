import { useLanguage } from "../../locales/langContext.jsx";
import css from "./LangSwitch.module.css";

const LangSwitch = () => {
  const { changeLanguage, language } = useLanguage();

  const handleLanguageChange = (event) => {
    changeLanguage(event.target.value);
  };

  return (
    <div className={css.languageSwitcher}>
      <select
        value={language}
        onChange={handleLanguageChange}
        className={css.languageSelect}
      >
        <option value="ua">Українська</option>
        <option value="en">English</option>
      </select>
    </div>
  );
};

export default LangSwitch;
