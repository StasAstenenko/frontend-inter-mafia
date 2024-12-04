import { useSelector } from "react-redux";
import { selectDailyNorm } from "../../redux/settings/selectors.js";
import { selectWaterAmountPerDay } from "../../redux/water/selectors.js";
import css from "./WaterProgressBar.module.css";

const WaterProgressBar = () => {
  const dailyNorma = useSelector(selectDailyNorm);
  const waterAmount = useSelector(selectWaterAmountPerDay);
  console.log(waterAmount);

  const waterPercentage = Math.min(
    Math.round((waterAmount / dailyNorma) * 100),
    100
  );

  return (
    <>
      <div className={css.container}>
        <p className={css.today}>Today</p>
        <span className={css.volumeInfo}>{waterPercentage}%</span>
        <div className={css.progressBarContainer}>
          <div
            className={css.progressBar}
            style={{ width: `${waterPercentage}%` }}
          />
          <svg
            className={css.icon}
            style={{
              left:
                waterPercentage === 0
                  ? `0px`
                  : `calc(${waterPercentage}% - 12px)`,
            }}
            width="12"
            height="12"
          >
            <use href="/icons/sprite.svg#circle" />
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
