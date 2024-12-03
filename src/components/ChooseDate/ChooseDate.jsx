import { useSelector } from "react-redux";
import { selectChosenDate } from "../../redux/water/selectors.js";
import css from "./ChooseDate.module.css";

const ChooseDate = () => {
  const choseDate = useSelector(selectChosenDate);

  // Функція для перевірки, чи є дата сьогоднішньою
  const isToday = (date) => {
    const today = new Date().toLocaleDateString("en-CA"); // Сьогоднішня дата у форматі "YYYY-MM-DD"
    return today === date; // Порівнюємо дати як рядки
  };
  // Якщо дата сьогодні, відображаємо "Today", якщо ні — форматовану дату
  const formattedDate = isToday(choseDate)
    ? "Today"
    : (() => {
        const date = new Date(choseDate); // Створюємо Date-об'єкт з рядка
        const day = date.getDate(); // Отримуємо день
        const month = date.toLocaleString("en-CA", { month: "long" }); // Отримуємо назву місяця
        return `${day}, ${month}`;
      })();

  return <h3 className={css["day-text"]}>{formattedDate}</h3>;
};

export default ChooseDate;
