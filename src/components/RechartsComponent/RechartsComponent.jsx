import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import {
  selectChosenDate,
  selectDaysDrinking,
} from "../../redux/water/selectors";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          padding: "10px 17px",
          position: "relative",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "14px",
            fontWeight: "bold",
            color: "#000",
          }}
        >
          {`${payload[0].value} ml`}
        </p>
        <div
          style={{
            position: "absolute",
            bottom: "-8px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "0",
            height: "0",
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: "8px solid #fff",
          }}
        />
      </div>
    );
  }

  return null;
};

const RechartsComponent = () => {
  const dispatch = useDispatch();
  const chosenDate = useSelector(selectChosenDate);
  const daysDrinking = useSelector(selectDaysDrinking);
  const mobileDeviceHeight = window.matchMedia("(max-width: 767px)").matches
    ? 300
    : 305;

  const [previousMonthData, setPreviousMonthData] = useState([]);

  const dayEndOfStatistic = useMemo(() => new Date(chosenDate), [chosenDate]);

  useEffect(() => {
    const currentDate = new Date(chosenDate);
    const isDateInFirstWeek = currentDate.getDate() <= 7;

    if (isDateInFirstWeek) {
      const firstDayPreviousMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      );
      const firstDayPreviousMonthFormatted = firstDayPreviousMonth
        .toISOString()
        .split("T")[0];

      axios
        .get("/water-per-month", {
          params: { date: firstDayPreviousMonthFormatted },
        })
        .then((response) => {
          setPreviousMonthData(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching previous month's data:", error);
        });
    }
  }, [chosenDate]);

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

    if (new Date(chosenDate).getDate() <= 7 && previousMonthData?.length > 0) {
      previousMonthData.forEach(({ date, amount }) => {
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
    }

    return daysArray;
  }, [daysDrinking, chosenDate, previousMonthData]);

  return (
    <ResponsiveContainer width="100%" height={mobileDeviceHeight}>
      <AreaChart
        data={lastWeekDays}
        margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
      >
        <defs>
          <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="day"
          tick={{ fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          domain={[0, 2500]}
          tickFormatter={(value) => `${Math.round((value / 1000) * 2) / 2} L`}
          tick={{ fontSize: 12 }}
          axisLine={false}
          width={45}
          tickLine={false}
        />

        <Tooltip
          content={<CustomTooltip />}
          cursor={{ stroke: "#82ca9d", strokeWidth: 1 }}
        />

        <Area
          type="monotone"
          dataKey="amount"
          stroke="#82ca9d"
          fill="url(#gradientFill)"
          strokeWidth={2}
          dot={{
            r: 6,
            fill: "#FFFFFF",
            stroke: "#82ca9d",
            strokeWidth: 2,
          }}
          activeDot={{
            r: 8,
            fill: "#FFFFFF",
            stroke: "#82ca9d",
            strokeWidth: 2,
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default RechartsComponent;
