import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectDailyNorm } from "../../redux/settings/selectors.js";
import {
  selectDayDetails,
  selectIsLoading,
} from "../../redux/water/selectors.js";
import { getWaterPerDay } from "../../redux/water/operations.js";
import { useLanguage } from "../../locales/langContext.jsx";
import css from "./WaterProgressBar.module.css";

const WaterProgressBar = () => {
  const { t } = useLanguage();

  const dailyNorma = useSelector(selectDailyNorm);
  const waterAmount = useSelector(selectDayDetails);
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-CA");
    dispatch(getWaterPerDay(today));
  }, [dispatch]);

  const totalAmount = waterAmount?.reduce(
    (total, item) => total + item.amount,
    0
  );

  const waterPercentage = Math.min(
    Math.round((totalAmount / dailyNorma) * 100),
    100
  );

  return (
    <div className={css.container}>
      <p className={css.today}>{t("Today")}</p>
      <div className={css.wrapper}>
        {isLoading || !waterAmount ? (
          <p className={css.loading}>...loading</p>
        ) : (
          <span
            className={css.volumeInfo}
            style={{
              left:
                waterPercentage === 0
                  ? `0px`
                  : `calc(${waterPercentage}% - 16px)`,
            }}
          >
            {waterPercentage}%
          </span>
        )}
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
      </div>

      <div className={css.percents}>
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default WaterProgressBar;
