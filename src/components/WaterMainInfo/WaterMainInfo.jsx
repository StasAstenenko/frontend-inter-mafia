import css from "./WaterMainInfo.module.css";

import bottleDesktop from "../../img/water-main-info/bottle-desktop.png";
import bottleDesktop2x from "../../img/water-main-info/bottle-desktop@2x.png";
import bottleTablet from "../../img/water-main-info/bottle-tablet.png";
import bottleTablet2x from "../../img/water-main-info/bottle-tablet@2x.png";
import bottleMob from "../../img/water-main-info/bottle-mob.png";
import bottleMob2x from "../../img/water-main-info/bottle-mob@2x.png";
import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma.jsx";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar.jsx";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn.jsx";
import UserSettingsModal from "../../modals/UserSettingsModal/UserSettingsModal.jsx";
import { useState } from "react";

const WaterMainInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <div className={css.container}>
        <h2 className={css.title}>aquatrack</h2>
        <WaterDailyNorma />
        <WaterProgressBar />
        <div className={css.bottleContainer}>
          <img
            className={css.bottle}
            srcSet={`${bottleDesktop} 1x, ${bottleDesktop2x} 2x, ${bottleTablet} 1x, ${bottleTablet2x} 2x, ${bottleMob} 1x, ${bottleMob2x} 2x`}
            src={bottleMob}
            alt="Bottle with water"
            sizes="(min-width: 1440px) 1440px, (min-width: 768px) 768px, 100vw"
          />
        </div>
        <AddWaterBtn />

        <button className={css.settingsButton} onClick={openModal}>
          Open Settings
        </button>
      </div>

      <UserSettingsModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default WaterMainInfo;
