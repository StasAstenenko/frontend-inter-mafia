import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  selectChosenMonth,
  selectDaysDrinking,
} from "../../redux/water/selectors";

const RechartsComponent = () => {
  const dateToShow = useSelector(selectChosenMonth);
  const daysDrinking = useSelector(selectDaysDrinking);

  const chartData = useMemo(() => {
    if (!dateToShow) return []; // Захист від відсутності даних

    const [year, month] = dateToShow.split("-");

    // Отримуємо кількість днів у місяці
    const totalDaysInMonth = new Date(year, month, 0).getDate();

    // Створюємо масив із днями місяця
    const daysArray = Array.from({ length: totalDaysInMonth }, (_, i) => ({
      date: i + 1,
      amount: 0,
    }));

    // Додаємо дані про споживання води
    daysDrinking?.forEach(({ date, amount }) => {
      const dayIndex = parseInt(date.slice(8, 10), 10) - 1; // Отримуємо день з дати
      if (daysArray[dayIndex]) {
        daysArray[dayIndex].amount += amount;
      }
    });

    return daysArray;
  }, [dateToShow, daysDrinking]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12 }}
          label={{ value: "Day", position: "insideBottomRight", offset: -5 }}
        />
        <YAxis
          domain={[0, "dataMax"]}
          tickFormatter={(value) => `${value / 1000} L`}
          label={{ value: "Water (L)", angle: -90, position: "insideLeft" }}
        />
        <Tooltip formatter={(value) => `${value} ml`} />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#9BE1A0"
          strokeWidth={2}
          dot={{ r: 6 }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RechartsComponent;
