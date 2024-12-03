import ChooseDate from "../ChooseDate/ChooseDate.jsx";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn.jsx";
import WaterList from "../WaterList/WaterList.jsx";
import css from "./DailyInfo.module.css";

const DailyInfo = () => {
  return (
    <div className={css["daily-info-container"]}>
      <div className={css["date-and-button-container"]}>
        <ChooseDate />
        <AddWaterBtn variant="alt" />
      </div>
      <WaterList />
    </div>
  );
};

export default DailyInfo;
