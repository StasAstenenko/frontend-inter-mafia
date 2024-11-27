import css from "./CalendarItem.module.css";

const CalendarItem = ({ day, percent, isActive }) => {
  return (
    <button
      type="button"
      className={`${css.item} ${isActive ? css.active : ""} ${
        percent === null ? css.empty : ""
      }`}
      disabled={!day}
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
