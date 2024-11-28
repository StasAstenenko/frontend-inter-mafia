import { useSelector } from "react-redux";
import {
  selectChosenDate,
  selectDaysDrinking,
  selectIsLoading,
} from "../../redux/water/selectors";
import CalendarItem from "../CalendarItem/CalendarItem";
import css from "./Calendar.module.css";

const Calendar = () => {
  const chosenDate = new Date(useSelector(selectChosenDate));
  const daysDrinking = useSelector(selectDaysDrinking);
  const isLoading = useSelector(selectIsLoading);

  const generateCalendarDays = () => {
    const year = chosenDate.getFullYear();
    const month = chosenDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 0).getDay(); // 0 - euro (Monday first)
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

    const daysArray = Array.from({ length: totalDaysInMonth }, (_, i) => ({
      day: i + 1,
      percent: "--",
    }));

    daysDrinking.forEach((dayData) => {
      daysArray[dayData.number].percent = dayData.percent;
    });

    const emptyDaysBefore = Array.from({ length: firstDayOfMonth }, () => ({
      day: null,
      percent: null,
    }));

    return [...emptyDaysBefore, ...daysArray];
  };

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
              isActive={
                day &&
                chosenDate.getDate() === day &&
                chosenDate.getMonth() === new Date().getMonth() &&
                chosenDate.getFullYear() === new Date().getFullYear()
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Calendar;
// по роботі з датами: https://uk.javascript.info/date
