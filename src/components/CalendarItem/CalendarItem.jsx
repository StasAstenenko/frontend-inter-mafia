import { useDispatch, useSelector } from "react-redux";
import css from "./CalendarItem.module.css";
import { fetchDayDetails } from "../../redux/water/operations";
import { setChosenDate } from "../../redux/water/slice";
import { selectChosenMonth } from "../../redux/water/selectors";

const CalendarItem = ({ day, percent, isActive }) => {
  const dispatch = useDispatch();
  const monthFromState = useSelector(selectChosenMonth);

  const handleClick = () => {
    const date = monthFromState + "-" + day.toString().padStart(2, 0);
    dispatch(setChosenDate(date));
    dispatch(fetchDayDetails(date));
  };

  return (
    <button
      type="button"
      className={`${css.item} ${isActive ? css.active : ""} ${
        percent === null ? css.empty : ""
      }`}
      disabled={!day}
      onClick={handleClick} // Обробник події
    >
      {day && (
        <>
          <span className={css.dayNumber}>{day}</span>
          {percent !== null && <span className={css.percent}>{percent}%</span>}
        </>
      )}
    </button>
  );
};

export default CalendarItem;
