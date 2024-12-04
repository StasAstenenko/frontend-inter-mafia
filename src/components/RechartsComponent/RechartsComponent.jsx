import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  selectChosenDate,
  selectDaysDrinking,
} from "../../redux/water/selectors";

const RechartsComponent = () => {
  const chosenDate = useSelector(selectChosenDate);
  const daysDrinking = useSelector(selectDaysDrinking);

  // Перетворюємо обрану дату в Date
  const dayEndOfStatistic = useMemo(() => new Date(chosenDate), [chosenDate]);

  // Створення масиву останніх 7 днів
  const lastWeekDays = useMemo(() => {
    const daysArray = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(dayEndOfStatistic);
      date.setDate(dayEndOfStatistic.getDate() - (6 - i));
      return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        amount: 0,
      };
    });

    daysDrinking.forEach(({ date, amount }) => {
      const drinkingDate = new Date(date);
      const index = daysArray.findIndex(
        (day) =>
          day.day === drinkingDate.getDate() &&
          day.month === drinkingDate.getMonth() + 1 &&
          day.year === drinkingDate.getFullYear()
      );
      if (index !== -1) {
        daysArray[index].amount += amount;
      }
    });

    return daysArray;
  }, [daysDrinking, dayEndOfStatistic]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={lastWeekDays}>
        <defs>
          <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" tick={{ fontSize: 12 }} />
        <YAxis
          domain={[0, "dataMax"]}
          tickFormatter={(value) => `${value / 1000} L`}
          tick={{ fontSize: 12 }}
        />
        <Tooltip formatter={(value) => `${value} ml`} />
        <Area
          type="monotone"
          dataKey="amount"
          stroke="#82ca9d"
          fill="url(#gradientFill)"
          strokeWidth={2}
          dot={{ r: 6 }}
          activeDot={{ r: 8 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default RechartsComponent;
