import { useSelector } from "react-redux";
import { selectDailyNorm } from "../../redux/auth/selectors.js";
import { formatVolume } from "../WaterProgressBar/WaterProgressBar.jsx";
import css from "./WaterDailyNorma.module.css";

const WaterDailyNorma = () => {
  const dailyNorm = useSelector(selectDailyNorm);
  return (
    <>
      <div className={css.container}>
        <p className={css.litres}> {formatVolume(dailyNorm)}</p>
        <p className={css.text}>My daily norma</p>
      </div>
    </>
  );
};

export default WaterDailyNorma;
