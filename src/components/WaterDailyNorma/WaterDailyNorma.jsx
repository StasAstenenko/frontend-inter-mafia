import { useSelector } from "react-redux";
import css from "./WaterDailyNorma.module.css";
import { selectDailyNorm } from "../../redux/settings/selectors.js";

export const formatVolume = (ml) => {
  return `${(ml / 1000).toFixed(1)}`;
};

const WaterDailyNorma = () => {
  const dailyNorma = useSelector(selectDailyNorm);
  // console.log(userInfo);
  // const dailyNorma = userInfo.data?.dailyNorm;

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
