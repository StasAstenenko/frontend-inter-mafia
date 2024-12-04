import { useState } from "react";
import css from "./MonthInfo.module.css";
import CalendarPagination from "../CalendarPagination/CalendarPagination.jsx";
import Calendar from "../Calendar/Calendar.jsx";
import RechartsComponent from "../RechartsComponent/RechartsComponent.jsx";

const MonthInfo = () => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(true);

  const toggleView = () => {
    setIsCalendarVisible((prevState) => !prevState);
  };

  return (
    <div className={css.sectionCalendar}>
      <div className={`${css.MonthInfo} ${css.toRow}`}>
        <h2 className={css.title}>
          {isCalendarVisible ? (
            "Month"
          ) : (
            <span className={css.statisticsTitle}>Statistics</span>
          )}
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

      {isCalendarVisible ? <Calendar /> : <RechartsComponent />}
    </div>
  );
};

export default MonthInfo;
