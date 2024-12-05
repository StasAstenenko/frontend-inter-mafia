import { useDispatch, useSelector } from "react-redux";
import css from "./CalendarItem.module.css";
import { fetchWaterData } from "../../redux/water/operations";
import { setChosenDate, setStatistics } from "../../redux/water/slice";
import { selectStatistics } from "../../redux/water/selectors.js";

const CalendarItem = ({ month, day, percent, isActive }) => {
  const dispatch = useDispatch();
  const isStatisticsVisible = useSelector(selectStatistics);

  const handleClick = () => {
    const date = `${month}-${day.toString().padStart(2, "0")}`;
    dispatch(setChosenDate(date));
    dispatch(fetchWaterData({ type: "day", date }));
    dispatch(setStatistics(!isStatisticsVisible));
  };

  return (
    <button
      type="button"
      className={`${css.item} ${!percent ? css.empty : ""}${
        percent >= 100 ? css.drinkALot : ""
      } ${isActive ? css.active : ""}`}
      disabled={!day}
      onClick={handleClick}
    >
      {day && (
        <>
          <span className={css.dayNumber}>{day}</span>
          {percent != null && (
            <span className={css.percent}>{percent ? `${percent}%` : ""}</span>
          )}
        </>
      )}
    </button>
  );
};

export default CalendarItem;
