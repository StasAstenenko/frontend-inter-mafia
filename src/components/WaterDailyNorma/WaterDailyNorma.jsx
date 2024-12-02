import { useSelector } from "react-redux";
import { selectDailyNorm } from "../../redux/settings/selectors.js";
import css from "./WaterDailyNorma.module.css";

export const formatVolume = (ml) => {
  return `${(ml / 1000).toFixed(1)}`;
};

const WaterDailyNorma = () => {
  const dailyNorma = useSelector(selectDailyNorm);

  return (
    <>
      <div className={css.container}>
        <p className={css.litres}>{formatVolume(dailyNorma)} L</p>
        <p className={css.text}>My daily norma</p>
      </div>
    </>
  );
};

export default WaterDailyNorma;
