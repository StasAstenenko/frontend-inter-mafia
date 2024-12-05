import { useDispatch, useSelector } from "react-redux";
import css from "./MonthInfo.module.css";
import CalendarPagination from "../CalendarPagination/CalendarPagination.jsx";
import Calendar from "../Calendar/Calendar.jsx";
import RechartsComponent from "../RechartsComponent/RechartsComponent.jsx";
import { selectStatistics } from "../../redux/water/selectors.js";
import { setStatistics } from "../../redux/water/slice.js";

const MonthInfo = () => {
  const dispatch = useDispatch();
  const isStatisticsVisible = useSelector(selectStatistics);

  const toggleView = () => {
    dispatch(setStatistics(!isStatisticsVisible));
  };

  return (
    <div className={css.sectionCalendar}>
      <div className={`${css.MonthInfo} ${css.toRow}`}>
        <h2 className={css.title}>
          {isStatisticsVisible ? (
            <span className={css.statisticsTitle}>Statistics</span>
          ) : (
            "Month"
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

      {isStatisticsVisible ? <RechartsComponent /> : <Calendar />}
    </div>
  );
};

export default MonthInfo;
