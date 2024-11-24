import css from "./ChooseDate.module.css";
import PropTypes from "prop-types";

const ChooseDate = ({ date = new Date() }) => {
  return (
    <>
      <h3 className={css["day-text"]}>{text(date)}</h3>
    </>
  );
};
ChooseDate.propTypes = {
  date: PropTypes.instanceOf(Date), // Перевірка на об'єкт Date
};
export default ChooseDate;

const dayParse = (chooseDay) => {
  const date = new Date(chooseDay);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate(); // Отримуємо день місяця
  const month = monthNames[date.getMonth()]; // Отримуємо назву місяця за індексом
  const year = date.getFullYear(); // Отримуємо рік
  return { day, month, year, date };
};

const isToday = (date) => {
  const today = dayParse(Date.now());
  const chooseDay = dayParse(date);

  return (
    today.day === chooseDay.day &&
    today.month === chooseDay.month &&
    today.year === chooseDay.year
  );
};

const text = (date) => {
  if (isToday(date)) {
    return "Today";
  } else {
    return `${dayParse(date).day}, ${dayParse(date).month}`;
  }
};
