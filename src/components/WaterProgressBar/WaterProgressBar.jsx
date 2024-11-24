import css from "./WaterProgressBar.module.css";

const WaterProgressBar = () => {
  return (
    <>
      <div className={css.container}>
        <p className={css.today}>Today</p>
        ------------------------
        <div className={css.percents}>
          <p className={css.percent}>0%</p>
          <p className={css.percent}>50%</p>
          <p className={css.percent}>100%</p>
        </div>
      </div>
    </>
  );
};

export default WaterProgressBar;
