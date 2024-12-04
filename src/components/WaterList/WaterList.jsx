// import { useDispatch, useSelector } from "react-redux";

import { Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";

import WaterItem from "../WaterItem/WaterItem";
import s from "./WaterList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectWaterItems } from "../../redux/water/selectors";
import { useEffect } from "react";
import { getWaterData } from "../../redux/water/operations.js";
const WaterList = () => {
  const items = useSelector(selectWaterItems);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWaterData());
  }, [dispatch]);
  const formatTime = (isoDate) => {
    const date = new Date(isoDate);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Форматування годин:хвилин
    const formattedHours = hours % 12 || 12; // Перетворення 24-годинного формату на 12-годинний
    const formattedMinutes = minutes.toString().padStart(2, "0"); // Додаємо 0 перед хвилинами, якщо потрібно
    const period = hours >= "12" ? "PM" : "AM"; // Визначаємо AM або PM

    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

  return (
    <ul className={s.wrapper}>
      {Array.isArray(items) && items.length === 1 ? (
        // Якщо в масиві тільки один елемент
        <li>
          <WaterItem
            _id={items[0]._id}
            amount={items[0].amount}
            date={formatTime(item.date)}
          />
        </li>
      ) : (
        <Swiper
          modules={[Scrollbar]}
          scrollbar={{ draggable: true }}
          breakpoints={{
            375: {
              spaceBetween: 8,
              slidesPerView: 2,
            },
            768: {
              spaceBetween: 32,
              slidesPerView: 3,
            },
            1440: {
              spaceBetween: 16,
              slidesPerView: 3,
            },
          }}
        >
          {Array.isArray(items) &&
            items.map((item, index) => (
              <SwiperSlide key={item._id || index}>
                <WaterItem
                  _id={item._id}
                  amount={item.amount}
                  date={formatTime(item.date)}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </ul>
  );
};

export default WaterList;
