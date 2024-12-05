import { useDispatch, useSelector } from "react-redux";
import css from "./CalendarPagination.module.css";
import { selectChosenMonth } from "../../redux/water/selectors";
import { setChosenMonth, setStatistics } from "../../redux/water/slice";

const CalendarPagination = () => {
  const dispatch = useDispatch();
  const monthFromState = useSelector(selectChosenMonth);

  const today = new Date().toLocaleString("en-CA").slice(0, 7);

  const handleTodayJump = () => {
    dispatch(setChosenMonth(today));
    dispatch(setStatistics(false));
  };

  const handleMonthChange = (shift) => {
    const [year, month] = monthFromState.split("-");
    const newMonth = parseInt(month) + shift;
    let newDate;

    if (newMonth === 0) {
      newDate = `${parseInt(year) - 1}-12`;
    } else if (newMonth === 13) {
      newDate = `${parseInt(year) + 1}-01`;
    } else {
      newDate = `${year}-${newMonth.toString().padStart(2, "0")}`;
    }

    dispatch(setChosenMonth(newDate));
    dispatch(setStatistics(false));
  };

  const formatDate = (date) =>
    `${new Date(date).toLocaleString("default", {
      month: "long",
    })}, ${date.slice(0, 4)}`;

  return (
    <div className={css.MonthNaw}>
      <button
        className={css.arrow}
        type="button"
        onClick={() => handleMonthChange(-1)}
      >
        &lt;
      </button>
      <button
        className={css.chosenMonth}
        type="button"
        onClick={handleTodayJump}
      >
        {formatDate(monthFromState)}
      </button>
      <button
        className={css.arrow}
        type="button"
        onClick={() => handleMonthChange(1)}
      >
        &gt;
      </button>
    </div>
  );
};

export default CalendarPagination;
