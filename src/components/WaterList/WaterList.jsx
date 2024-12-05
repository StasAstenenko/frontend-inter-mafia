import { Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "./Swaper.css";

import WaterItem from "../WaterItem/WaterItem";
import s from "./WaterList.module.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  selectDayDetails,
  selectChosenDate,
} from "../../redux/water/selectors";

import WaterModal from "../../modals/WaterModal/WaterModal";
import DeleteWaterModal from "../../modals/DeleteWaterModal/DeleteWaterModal.jsx";

const WaterList = () => {
  // Отримуємо вибрану дату зі стейту
  const currentDate = useSelector(selectChosenDate);

  // Отримуємо деталі води для вибраного дня
  const items = useSelector(selectDayDetails);

  const [waterModalisOpen, setWaterModalisOpen] = useState(false);
  const [isDeleteWaterModalOpen, setisDeleteWaterModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null); // Зберігаємо тільки ID

  const openWaterModal = (id) => {
    setSelectedId(id);
    setWaterModalisOpen(true);
  };
  const closeWaterModal = () => {
    setWaterModalisOpen(false);
    setSelectedId(null);
  };

  const openDeleteWaterModal = (id) => {
    setSelectedId(id);
    setisDeleteWaterModalOpen(true);
  };
  const closeDeleteWaterModal = () => {
    setisDeleteWaterModalOpen(false);
    setSelectedId(null);
  };

  useEffect(() => {
    if (currentDate) {
      // Переконайтесь, що дані завантажуються для вибраної дати
      // Можливо, потрібно викликати dispatch для отримання даних для цього дня, якщо вони ще не завантажені
    }
  }, [currentDate]); // Перезапускається при зміні currentDate

  if (!items) return;

  const formatTime = (inDate) => {
    const date = new Date(inDate);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";

    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

  const selectedItem = items.find((item) => item._id === selectedId);

  return (
    <ul className={s.wrapper}>
      {Array.isArray(items) && items.length === 1 ? (
        <li>
          <WaterItem
            _id={items[0]._id}
            amount={items[0].amount}
            date={formatTime(items[0].date)}
            onEdit={() => openWaterModal(items[0]._id)}
            openDeleteWaterModal={() => openDeleteWaterModal(items[0]._id)}
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
            items.map((item) => (
              <SwiperSlide key={item._id}>
                <WaterItem
                  _id={item._id}
                  amount={item.amount}
                  date={formatTime(item.date)}
                  openWaterModal={() => openWaterModal(item._id)}
                  onEdit={() => openWaterModal(item._id)}
                  openDeleteWaterModal={() => openDeleteWaterModal(item._id)}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
      <WaterModal
        isOpen={waterModalisOpen}
        onClose={closeWaterModal}
        operationType="edit"
        data={selectedItem}
      />
      <DeleteWaterModal
        isOpen={isDeleteWaterModalOpen}
        onClose={closeDeleteWaterModal}
        data={selectedItem}
      />
    </ul>
  );
};

export default WaterList;
