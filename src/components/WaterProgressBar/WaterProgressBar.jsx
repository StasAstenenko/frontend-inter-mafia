import { useSelector } from "react-redux";
// import { selectWaterAmountForToday } from "../../redux/water/selectors.js";
import { selectDailyNorm } from "../../redux/settings/selectors.js";
import { selectDayDetails } from "../../redux/water/selectors.js";
import css from "./WaterProgressBar.module.css";

const WaterProgressBar = () => {
  // const currentAmount = useSelector(selectWaterAmountForToday);
  // console.log(currentAmount);

  const dailyNorma = useSelector(selectDailyNorm);
  const currentAmount = useSelector(selectDayDetails);
  // const chosenDate = useSelector(selectChosenDate);

  // const todayData = currentAmount.filter((entry) => entry.date === chosenDate);

  // Якщо структура даних dayDetails виглядає як масив, можна пройтись по ньому:
  const totalWater = currentAmount.reduce((total, entry) => {
    return total + (entry.amount || 0); // amount - це приклад назви поля з кількістю води
  }, 0);

  const waterPercentage = Math.round((totalWater / dailyNorma) * 100);

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
