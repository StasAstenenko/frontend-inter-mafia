import UserPanel from "../../components/UserPanel/UserPanel.jsx";
// import DailyInfo from "../DailyInfo/DailyInfo.jsx";
import MonthInfo from "../../components/MonthInfo/MonthInfo.jsx";
import css from "./WaterDetailedInfo.module.css";

const WaterDetailedInfo = () => {
  return (
    <div className={css.container}>
      <UserPanel />
      {/* <DailyInfo /> */}
      <MonthInfo />
    </div>
  );
};

export default WaterDetailedInfo;
