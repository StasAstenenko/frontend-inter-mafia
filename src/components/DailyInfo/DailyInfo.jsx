import { useMemo } from "react";
import { selectChosenDate } from "../../redux/water/selectors.js";
import { useSelector } from "react-redux";
import ChooseDate from "../ChooseDate/ChooseDate.jsx";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn.jsx";
import WaterList from "../WaterList/WaterList.jsx";
import css from "./DailyInfo.module.css";

// Функція для отримання поточної дати у форматі 'YYYY-MM-DDTHH:mm:ss'
const today = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Місяці з 0
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

const DailyInfo = () => {
  const date = useSelector(selectChosenDate);
  const defaultDate = useMemo(() => today(), []); // Розрахунок один раз
  const effectiveDate = date && isValidDate(date) ? date : defaultDate; // Перевірка валідності дати

  return (
    <div className={css["daily-info-container"]}>
      <div className={css["date-and-button-container"]}>
        <ChooseDate date={effectiveDate} />
        <AddWaterBtn variant="alt" />
      </div>
      <WaterList />
    </div>
  );
};

// Функція для перевірки валідності дати у форматі 'YYYY-MM-DDTHH:mm:ss'
const isValidDate = (date) => {
  // Регулярний вираз для перевірки формату 'YYYY-MM-DDTHH:mm:ss'
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
  return regex.test(date);
};

export default DailyInfo;
