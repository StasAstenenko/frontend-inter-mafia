import { useDispatch } from "react-redux";
import css from "./CalendarItem.module.css";
import { fetchWaterData } from "../../redux/water/operations";
import { setChosenDate } from "../../redux/water/slice";

const CalendarItem = ({ month, day, percent, isActive }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    const date = `${month}-${day.toString().padStart(2, "0")}`;
    dispatch(setChosenDate(date));
    dispatch(fetchWaterData({ type: "day", date }));
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
