import { useEffect } from "react";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn.jsx";
import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma.jsx";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar.jsx";
import LangSwitch from "../LangSwitch/LangSwitch.jsx";
import { getUserInfo } from "../../redux/settings/operations.js";
import { useDispatch } from "react-redux";
import css from "./WaterMainInfo.module.css";
import { NavLink } from "react-router-dom";

const WaterMainInfo = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  return (
    <>
      <div className={css.container}>
        <NavLink to="/">
          <h2 className={css.title}>aquatrack</h2>
        </NavLink>
        <LangSwitch />
        <WaterDailyNorma />
        <WaterProgressBar />
        <AddWaterBtn />
      </div>
    </>
  );
};

export default WaterMainInfo;
