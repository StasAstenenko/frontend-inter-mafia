import css from "./WaterDailyNorma.module.css";

const WaterDailyNorma = () => {
  return (
    <>
      <div className={css.container}>
        <p className={css.litres}>1.5 L</p>
        <p className={css.text}>My daily norma</p>
      </div>
    </>
  );
};

export default WaterDailyNorma;
