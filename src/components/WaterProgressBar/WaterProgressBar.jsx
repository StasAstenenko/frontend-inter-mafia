// import { useSelector } from "react-redux";
import css from "./WaterProgressBar.module.css";

const WaterProgressBar = () => {
  // const { currentAmount, dailyGoal, history } = useSelector(selectWater);

  // export const formatVolume = (ml) => {
  //   return `${(ml / 1000).toFixed(1)} L`;
  // };
  // const waterPercentage = Math.round((currentAmount / dailyGoal) * 100);

  return (
    <>
      <div className={css.container}>
        <p className={css.today}>Today</p>
        <span className={css.volumeInfo}>
          {/* {formatVolume(currentAmount)} / {formatVolume(dailyGoal)} */}
        </span>
        <div className={css.progressBarContainer}>
          <div
            className={css.progressBar}
            // style={{ width: `${waterPercentage}%` }}
          />
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
