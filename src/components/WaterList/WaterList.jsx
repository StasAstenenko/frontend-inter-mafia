// import { useDispatch, useSelector } from "react-redux";

import { Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";

import WaterItem from "../WaterItem/WaterItem";
import s from "./WaterList.module.css";
import { useDispatch, useSelector } from "react-redux";
// import { selectWaterItems } from "../../redux/water/selectors";
import { useEffect, useState } from "react";
import { getWaterPerDay } from "../../redux/water/operations";
import { selectWaterAmountPerDay } from "../../redux/water/selectors";
import WaterModal from "../../modals/WaterModal/WaterModal";
// import { getWaterData } from "../../redux/water/operations.js";
const WaterList = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  useEffect(() => {
    const date = getCurrentDate();
    dispatch(getWaterPerDay(date));
  }, [dispatch]);

  const items = useSelector(selectWaterAmountPerDay);
  // console.log(items);

  // const items = useSelector(selectWaterItems);
  // useEffect(() => {
  //   dispatch(getWaterData());
  // }, [dispatch]);
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

  // const closeLogOutModal = () => setLogOutModalisOpen(false);
  const [logOutModalisOpen, setLogOutModalisOpen] = useState(false);
  // const openLogOutModal = () => setLogOutModalisOpen(true);
  const openLogOutModal = (item) => {
    setSelectedItem(item);
    setLogOutModalisOpen(true);
  };
  const closeLogOutModal = () => {
    setLogOutModalisOpen(false);
    setSelectedItem(null);
  };

  return (
    <ul className={s.wrapper}>
      {Array.isArray(items) && items.length === 1 ? (
        // Якщо в масиві тільки один елемент
        <li>
          <WaterItem
            _id={items[0]._id}
            amount={items[0].amount}
            date={formatTime(items.date)}
            onEdit={() => openLogOutModal(items[0])}
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
                  openLogOutModal={openLogOutModal}
                  onEdit={() => openLogOutModal(item)}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
      <WaterModal
        isOpen={logOutModalisOpen}
        onClose={closeLogOutModal}
        operationType="edit"
        data={selectedItem}
      />
    </ul>
  );
};

export default WaterList;
