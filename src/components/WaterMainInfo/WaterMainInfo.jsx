import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma.jsx";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar.jsx";
пш;

import css from "./WaterMainInfo.module.css";

const WaterMainInfo = () => {
  return (
    <>
      <div className={css.container}>
        <h2 className={css.title}>aquatrack</h2>
        <WaterDailyNorma />
        <WaterProgressBar />
        <AddWaterBtn />
      </div>
    </>
  );
};

export default WaterMainInfo;
