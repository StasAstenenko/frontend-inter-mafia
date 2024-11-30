import { useDispatch, useSelector } from "react-redux";
import css from "./CalendarPagination.module.css";
import { selectChosenMonth } from "../../redux/water/selectors";
import { setChosenMonth } from "../../redux/water/slice";

const CalendarPagination = () => {
  const dispatch = useDispatch();
  const monthFromState = useSelector(selectChosenMonth);

  const handleMonthChange = (shift) => {
    const [year, month] = monthFromState.split("-");
    const newMonth = parseInt(month) + shift;
    let newDate;
    if (newMonth === 0) {
      newDate = parseInt(year) - 1 + "-12";
    } else if (newMonth === 13) {
      newDate = parseInt(year) + 1 + "-01";
    } else {
      newDate = year + "-" + newMonth.toString().padStart(2, "0");
    }

    dispatch(setChosenMonth(newDate));
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
      <span className={css.chosenMonth}>{formatDate(monthFromState)}</span>
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
