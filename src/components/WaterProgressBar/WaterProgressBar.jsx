import { useSelector } from "react-redux";
import { selectWaterAmountForToday } from "../../redux/water/selectors.js";
import { selectDailyNorm } from "../../redux/settings/selectors.js";
import css from "./WaterProgressBar.module.css";
import { formatVolume } from "../WaterDailyNorma/WaterDailyNorma.jsx";

const WaterProgressBar = () => {
  const currentAmount = useSelector(selectWaterAmountForToday);
  // console.log(currentAmount);
  const dailyNorma = useSelector(selectDailyNorm);

  const waterPercentage = formatVolume(
    Math.round((currentAmount / dailyNorma) * 100)
  );

  return (
    <>
      <div className={css.container}>
        <p className={css.today}>Today</p>
        <span className={css.volumeInfo}>{waterPercentage}</span>
        <div className={css.progressBarContainer}>
          <div
            className={css.progressBar}
            style={{ width: `${waterPercentage}%` }}
          />
          <svg
            className={css.icon}
            style={{ left: `calc(${waterPercentage}% - 12px)` }}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="6" cy="6" r="5.5" fill="white" stroke="#9BE1A0" />
          </svg>
        </div>
        <div className={css.percents}>
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    </>
  );
};

export default WaterProgressBar;
