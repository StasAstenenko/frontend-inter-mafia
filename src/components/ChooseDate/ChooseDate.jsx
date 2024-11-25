import css from "./ChooseDate.module.css";
import PropTypes from "prop-types";

const ChooseDate = ({ date = Date.now() }) => {
  const chooseDate = new Date(date); // Створюємо об'єкт Date

  // Форматуємо дату в потрібний формат
  const year = chooseDate.getFullYear();
  const month = String(chooseDate.getMonth() + 1).padStart(2, "0"); // Місяці з 0
  const day = String(chooseDate.getDate()).padStart(2, "0");
  const hours = String(chooseDate.getHours()).padStart(2, "0");
  const minutes = String(chooseDate.getMinutes()).padStart(2, "0");
  const seconds = String(chooseDate.getSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  console.log(formattedDate); // Наприклад: 2024-11-25T05:47:28
  return (
    <>
      <h3 className={css["day-text"]}>{text(date)}</h3>
    </>
  );
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
