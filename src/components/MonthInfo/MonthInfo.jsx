import { useState } from "react";
import css from "./MonthInfo.module.css";
import CalendarPagination from "../CalendarPagination/CalendarPagination.jsx";
import Calendar from "../Calendar/Calendar.jsx";

const MonthInfo = () => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(true);

  const toggleView = () => {
    setIsCalendarVisible((prevState) => !prevState);
  };

  return (
    <div className={css.sectionCalendar}>
      <div className={`${css.MonthInfo} ${css.toRow}`}>
        <h2 className={css.title}>Month</h2>
        <div className={css.toRow}>
          <CalendarPagination />
          <button className={css.toggleViewBtn} onClick={toggleView}>
            Г/К
          </button>
        </div>
      </div>

      {isCalendarVisible ? (
        <Calendar />
      ) : (
        <div className={css.box}>"Тут буде графік"</div>
      )}
    </div>
  );
};

export default MonthInfo;
