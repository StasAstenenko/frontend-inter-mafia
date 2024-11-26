import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma.jsx";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar.jsx";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn.jsx";

import css from "./WaterMainInfo.module.css";
import Logo from "../Logo/Logo.jsx";
const WaterMainInfo = () => {
  return (
    <>
      <div className={css.container}>
        <Logo />
        <WaterDailyNorma />
        <WaterProgressBar />
        <AddWaterBtn />
      </div>
    </>
  );
};

export default WaterMainInfo;
