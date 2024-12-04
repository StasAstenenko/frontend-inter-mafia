import { useEffect, useMemo } from "react";
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
import Loader from "../Loader/Loader";

const Calendar = () => {
  const dispatch = useDispatch();
  const dateToShow = useSelector(selectChosenMonth);
  const daysDrinking = useSelector(selectDaysDrinking);
  const daysAsInWeek = useSelector(selectDaysNotAsInWeek) ? false : true;
  const isLoading = useSelector(selectIsLoading);
  const mobileDevice = window.matchMedia("(max-width: 767px)").matches;

  const [today_year, today_month, today_day] = new Date() // month починаються з нуля в Date
    .toLocaleDateString("en-CA")
    .split("-");

  const [year, month] = dateToShow.split("-");
  const firstDayOfWeek = 0; // Перший день місяця (0 - понеділок, 1 - неділя)

  useEffect(() => {
    dispatch(fetchWaterData({ type: "month", date: dateToShow }));
  }, [dateToShow, dispatch]);

  const isActiveDay = (day) =>
    today_day == day && today_month == month && today_year == year;

  const calendarDays = useMemo(() => {
    const totalDaysInMonth = new Date(year, month, 0).getDate();
    const daysArray = Array.from({ length: totalDaysInMonth }, (_, i) => ({
      day: i + 1,
      percent: 0,
      totalAmount: 0,
      currentDailyNorm: 0,
    }));

    // Перший прохід: групуємо дані за днями
    daysDrinking?.forEach((dayData) => {
      // тимчасова перевірка, поки сервер присилає більше ніж треба
      if (dayData.date.slice(5, 7) != month || dayData.date.slice(0, 4) != year)
        return;

      const currentDay = daysArray[parseInt(dayData.date.slice(8, 10)) - 1];
      currentDay.totalAmount += dayData.amount;

      // Взяти найсвіжішу currentDailyNorm
      if (!currentDay.updatedAt || dayData.updatedAt > currentDay.updatedAt) {
        currentDay.updatedAt = dayData.updatedAt;
        currentDay.currentDailyNorm = dayData.currentDailyNorm;
      }
    });

    // Другий прохід: обчислюємо відсотки
    daysArray.forEach((day) => {
      if (day.currentDailyNorm)
        day.percent = Math.round(
          (day.totalAmount / day.currentDailyNorm) * 100
        );
    });

    if (!daysAsInWeek) return daysArray;

    // Додаємо порожні дні перед початком місяця
    const firstDayOfMonth = new Date(
      year,
      parseInt(month) - 1,
      firstDayOfWeek
    ).getDay();
    const emptyDaysBefore = Array.from({ length: firstDayOfMonth }, () => ({
      day: null,
      percent: null,
      totalAmount: null,
      currentDailyNorm: null,
    }));

    return [...emptyDaysBefore, ...daysArray];
  }, [daysDrinking, daysAsInWeek, month, year]);

  return (
    <div className={css.calendar}>
      {isLoading ? (
        <Loader height={mobileDevice ? "300px" : "305px"} />
      ) : (
        <div
          className={`${
            daysAsInWeek
              ? `${css.grid} ${mobileDevice ? "" : "grid7desktop"}`
              : css.grid8
          }`}
        >
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
