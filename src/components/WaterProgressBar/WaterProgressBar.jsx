import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectDailyNorm } from "../../redux/settings/selectors.js";
import { selectWaterAmountPerDay } from "../../redux/water/selectors.js";
import { fetchWaterData } from "../../redux/water/operations.js";
import css from "./WaterProgressBar.module.css";
import { useLanguage } from "../../locales/langContext.jsx";

const WaterProgressBar = () => {
  const { t } = useLanguage();

  const dailyNorma = useSelector(selectDailyNorm);
  const waterAmount = useSelector(selectWaterAmountPerDay);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!waterAmount) {
      dispatch(
        fetchWaterData({
          type: "day",
          date: new Date().toLocaleString("en-CA"),
        })
      );
      console.log("day fetch");
      return;
    }
  }, [waterAmount, dispatch]);

  console.log("progressbar");

  const totalAmount = waterAmount?.reduce(
    (total, item) => total + item.amount,
    0
  );
  // console.log(totalAmount);
  const waterPercentage = Math.min(
    Math.round((totalAmount / dailyNorma) * 100),
    100
  );

  return (
    <>
      <div className={css.container}>
        <p className={css.today}>{t("Today")}</p>
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
