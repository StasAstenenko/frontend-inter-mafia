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
        <h2 className={css.title}>
          {isCalendarVisible ? "Month" : "Statistics"}
        </h2>
        <div className={css.toRow}>
          <CalendarPagination />
          <button className={css.toggleViewBtn} onClick={toggleView}>
            <svg className={css.toggleViewBtnImg}>
              <use href="/icons/sprite.svg#pie-chart"></use>
            </svg>
          </button>
        </div>
      </div>

      {isCalendarVisible ? <Calendar /> : <div className={css.box}></div>}
    </div>
  );
};

export default MonthInfo;
