import ChooseDate from "../ChooseDate/ChooseDate.jsx";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn.jsx";
import WaterList from "../WaterList/WaterList.jsx";
import css from "./DailyInfo.module.css";
import PropTypes from "prop-types";

const DailyInfo = ({ date }) => {
  return (
    <div className={css["daily-info-container"]}>
      <ChooseDate date={date} />
      <AddWaterBtn />
      <WaterList />
    </div>
  );
};
DailyInfo.propTypes = {
  date: PropTypes.instanceOf(Date), // Перевірка на об'єкт Date
};
export default DailyInfo;
