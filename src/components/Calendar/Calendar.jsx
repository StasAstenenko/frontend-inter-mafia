import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from "./Calendar.module.css";
import {
  selectChosenMonth,
  selectDaysDrinking,
  selectIsLoading,
} from "../../redux/water/selectors";
import {
  selectDaysNotAsInWeek,
  selectSundayFirst,
  selectDailyNorm,
} from "../../redux/settings/selectors";
import CalendarItem from "../CalendarItem/CalendarItem";
import { fetchWaterData } from "../../redux/water/operations";
import Loader from "../Loader/Loader";

const Calendar = () => {
  const dispatch = useDispatch();
  const dateToShow = useSelector(selectChosenMonth);
  const daysDrinking = useSelector(selectDaysDrinking);
  const isLoading = useSelector(selectIsLoading);

  const currentDailyNorm = useSelector(selectDailyNorm);
  const daysAsInWeek = !useSelector(selectDaysNotAsInWeek);
  const firstDayOfWeek = useSelector(selectSundayFirst) ? 1 : 0; // 1: неділя, 0: понеділок
  const mobileDevice = window.matchMedia("(max-width: 767px)").matches;

  const [year, month] = dateToShow.split("-");
  const [today_year, today_month, today_day] = new Date()
    .toLocaleDateString("en-CA")
    .split("-");

  useEffect(() => {
    dispatch(fetchWaterData({ type: "month", date: dateToShow }));
  }, [dispatch, dateToShow]);

  const isActiveDay = (day) =>
    today_day == day && today_month == month && today_year == year;

  // Створення днів і рахування води в них
  const monthDays = useMemo(() => {
    if (!daysDrinking) return [];

    const totalDaysInMonth = new Date(year, month, 0).getDate();
    const daysArray = Array.from({ length: totalDaysInMonth }, (_, i) => ({
      day: i + 1,
      percent: 0,
      totalAmount: 0,
    }));

    daysDrinking.forEach((day) => {
      const index = day.date.slice(8, 10) - 1;
      daysArray[index].totalAmount += day.amount;
    });

    daysArray.forEach((day) => {
      day.percent = Math.round((day.totalAmount / currentDailyNorm) * 100);
    });

    return daysArray;
  }, [daysDrinking, currentDailyNorm, year, month]);

  // Додавання порожніх днів перед початком місяця
  const calendarDays = useMemo(() => {
    if (!daysAsInWeek) return monthDays;

    const firstDayOfMonth = new Date(
      year,
      parseInt(month) - 1,
      firstDayOfWeek
    ).getDay();
    const emptyDaysBefore = Array.from({ length: firstDayOfMonth }, () => ({
      day: null,
      percent: null,
      totalAmount: null,
    }));

    return [...emptyDaysBefore, ...monthDays];
  }, [monthDays, daysAsInWeek, firstDayOfWeek, year, month]);

  return (
    <div className={css.calendar}>
      {isLoading ? (
        <Loader height={mobileDevice ? "300px" : "305px"} />
      ) : (
        <div
          className={`${daysAsInWeek ? `${css.grid} grid7desktop` : css.grid8}`}
        >
          {calendarDays?.map(({ day, percent }, index) => (
            <CalendarItem
              key={`day-${dateToShow}-${day || "empty"}-${index}`}
              month={dateToShow}
              day={day !== null ? day : null}
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
