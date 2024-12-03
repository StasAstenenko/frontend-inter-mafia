import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
} from "recharts";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectDaysDrinking } from "../../redux/water/selectors";

const RechartsComponent = () => {
  const daysDrinking = useSelector(selectDaysDrinking);

  const chartData = useMemo(() => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 6); // 7 днів від сьогодні

    const daysArray = Array.from({ length: 7 }, (_, i) => {
      const currentDate = new Date(sevenDaysAgo);
      currentDate.setDate(sevenDaysAgo.getDate() + i);

      return {
        date: currentDate.getDate(), // Число дня
        amount: 0,
      };
    });

    // Заповнюємо обсяг води, якщо є дані
    daysDrinking?.forEach(({ date, amount }) => {
      const day = parseInt(date.slice(8, 10));
      const dayData = daysArray.find((dayObj) => dayObj.date === day);
      if (dayData) dayData.amount += amount;
    });

    return daysArray;
  }, [daysDrinking]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        {/* Дефініція градієнта */}
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9BE1A0" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#9BE1A0" stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Сітка */}
        <CartesianGrid strokeDasharray="3 3" />

        {/* Вісь X */}
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />

        {/* Вісь Y */}
        <YAxis
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `${value / 1000} L`}
          width={40}
          axisLine={false}
          tickLine={false}
        />

        {/* Підказки */}
        <Tooltip formatter={(value) => `${value} ml`} />

        {/* Градієнт */}
        <Area
          type="monotone"
          dataKey="amount"
          stroke="#9BE1A0"
          fill="url(#gradient)"
          fillOpacity={1}
        />

        {/* Лінія */}
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
