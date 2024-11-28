import css from "./ChooseDate.module.css";

const ChooseDate = ({ date }) => {
  // Функція для перевірки, чи є дата сьогоднішньою
  const isToday = (date) => {
    const today = new Date();
    const inputDate = new Date(date);

    // Порівнюємо лише рік, місяць і день
    return (
      today.getFullYear() === inputDate.getFullYear() &&
      today.getMonth() === inputDate.getMonth() &&
      today.getDate() === inputDate.getDate()
    );
  };

  // Якщо дата сьогодні, відображаємо "Today", якщо ні — форматовану дату
  const formattedDate = isToday(date)
    ? "Today"
    : (() => {
        const dateObj = new Date(date);
        const day = dateObj.getDate();
        const month = dateObj.toLocaleString("en-GB", { month: "long" });
        return `${day}, ${month}`;
      })();

  return <h3 className={css["day-text"]}>{formattedDate}</h3>;
};

export default ChooseDate;
