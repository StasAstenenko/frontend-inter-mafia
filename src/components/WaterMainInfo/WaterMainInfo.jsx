import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma.jsx";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar.jsx";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn.jsx";

import css from "./WaterMainInfo.module.css";
import Logo from "../Logo/Logo.jsx";
import UserSettingsModal from "../../modals/UserSettingsModal/UserSettingsModal.jsx";
import { useState } from "react";

const WaterMainInfo = () => {
  return (
    <>
      <div className={css.container}>
        <Logo className={css.logo} />
        <WaterDailyNorma />
        <WaterProgressBar />
        <AddWaterBtn />
      </div>
    </>
  );
};

export default WaterMainInfo;
