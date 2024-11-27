import { useDispatch, useSelector } from "react-redux";
import css from "./CalendarPagination.module.css";
import { selectChosenDate } from "../../redux/water/selectors";
import { setChosenDate } from "../../redux/water/slice";

const CalendarPagination = () => {
  const dispatch = useDispatch();
  const chosenDate = new Date(useSelector(selectChosenDate));

  const handleMonthChange = (shift) => {
    const updatedDate = new Date(chosenDate);
    updatedDate.setMonth(updatedDate.getMonth() + shift);
    dispatch(setChosenDate(updatedDate.toISOString()));
  };

  const formatDate = (date) =>
    `${date.toLocaleString("default", {
      month: "long",
    })}, ${date.getFullYear()}`;

  return (
    <div>
      <button
        className={css.arrow}
        type="button"
        onClick={() => handleMonthChange(-1)}
      >
        &lt;
      </button>
      <span className={css.chosenDate}>{formatDate(chosenDate)}</span>
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
