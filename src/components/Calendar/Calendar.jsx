import { useSelector } from "react-redux";
import css from "./Calendar.module.css";
import {
  selectChosenMonth,
  selectDaysDrinking,
  selectIsLoading,
} from "../../redux/water/selectors";
import { selectDaysNotAsInWeek } from "../../redux/settings/selectors";
import CalendarItem from "../CalendarItem/CalendarItem";

const Calendar = () => {
  const daysNotAsInWeek = useSelector(selectDaysNotAsInWeek) ? true : false;
  const isLoading = useSelector(selectIsLoading);
  const daysDrinking = useSelector(selectDaysDrinking);

  const today = new Date();
  const dateFromState = useSelector(selectChosenMonth);
  const [year, month] = dateFromState.split("-");
  const yearInt = parseInt(year);
  const monthInt = parseInt(month) - 1; // Місяці в Date починаються з 0

  const generateCalendarDays = () => {
    const totalDaysInMonth = new Date(yearInt, monthInt + 1, 0).getDate();
    const daysArray = Array.from({ length: totalDaysInMonth }, (_, i) => ({
      day: i + 1,
      percent: "--",
    }));

    daysDrinking.forEach((dayData) => {
      if (dayData.number >= 1 && dayData.number <= totalDaysInMonth) {
        daysArray[dayData.number - 1].percent = dayData.percent;
      }
    });

    if (daysNotAsInWeek) return daysArray;

    // Порожні дні перед початком місяця
    const firstDayOfMonth = new Date(yearInt, monthInt, 0).getDay(); // set 1 for Sunday-start week
    const emptyDaysBefore = Array.from({ length: firstDayOfMonth }, () => ({
      day: null,
      percent: null,
    }));

    return [...emptyDaysBefore, ...daysArray];
  };

  const isActiveDay = (day) =>
    day &&
    today.getDate() === day &&
    today.getMonth() === monthInt &&
    today.getFullYear() === yearInt;

  const calendarDays = generateCalendarDays();

  return (
    <div className={css.calendar}>
      {isLoading ? (
        <p>Creating your water-drinking calendar...</p>
      ) : (
        <div className={css.grid}>
          {calendarDays.map(({ day, percent }, index) => (
            <CalendarItem
              key={`${index}${percent}`}
              day={day}
              percent={percent}
              isActive={isActiveDay(day)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Calendar;
// по роботі з датами: https://uk.javascript.info/date
