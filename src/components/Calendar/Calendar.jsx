import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from "./Calendar.module.css";
import {
  selectChosenMonth,
  selectDaysDrinking,
  selectIsLoading,
} from "../../redux/water/selectors";
import { selectDaysNotAsInWeek } from "../../redux/settings/selectors";
import CalendarItem from "../CalendarItem/CalendarItem";
import { fetchWaterData } from "../../redux/water/operations";

const Calendar = () => {
  const dispatch = useDispatch();
  const dateToShow = useSelector(selectChosenMonth);
  console.log(dateToShow);
  const daysDrinking = useSelector(selectDaysDrinking);
  console.log(daysDrinking);

  useEffect(() => {
    dispatch(fetchWaterData({ type: "month", date: dateToShow }));
  }, [dateToShow]);

  const daysNotAsInWeek = useSelector(selectDaysNotAsInWeek) ? true : false;
  const isLoading = useSelector(selectIsLoading);

  const today = new Date().toLocaleString();
  const [today_day, today_month, today_year_time] = today.split(".");
  const today_year = today_year_time.slice(0, 4);
  const [year, month] = dateToShow.split("-");
  const yearInt = parseInt(year);
  const monthInt = parseInt(month) - 1; // Місяці в Date починаються з 0

  const generateCalendarDays = () => {
    const totalDaysInMonth = new Date(yearInt, monthInt + 1, 0).getDate();
    const daysArray = Array.from({ length: totalDaysInMonth }, (_, i) => ({
      day: i + 1,
      percent: "--",
    }));

    console.dir(daysDrinking.data);
    daysDrinking.date?.forEach((dayData) => {
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
    today_day == day && today_month == month && today_year == year;

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
              month={dateToShow}
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
