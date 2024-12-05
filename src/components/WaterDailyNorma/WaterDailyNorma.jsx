import { useSelector } from "react-redux";
import { selectDailyNorm } from "../../redux/settings/selectors.js";
import css from "./WaterDailyNorma.module.css";
import { useLanguage } from "../../locales/langContext.jsx";

const WaterDailyNorma = () => {
  const { t } = useLanguage();
  const dailyNorma = useSelector(selectDailyNorm);
  // console.log("daily norma", dailyNorma);

  const formatVolume = (ml) => {
    return `${(ml / 1000).toFixed(1)}`;
  };

  return (
    <>
      <div className={css.container}>
        <p className={css.litres}>
          {formatVolume(dailyNorma)} {t("L")}
        </p>
        <p className={css.text}>{t("MyDailyNorma")}</p>
      </div>
    </>
  );
};

export default WaterDailyNorma;
