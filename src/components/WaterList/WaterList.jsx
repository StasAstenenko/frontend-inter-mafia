import { Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "./Swaper.css";

import WaterItem from "../WaterItem/WaterItem";
import s from "./WaterList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getWaterPerDay } from "../../redux/water/operations";
import { selectDayDetails } from "../../redux/water/selectors";

// import { selectWaterItems } from "../../redux/water/selectors";
// import { getWaterData } from "../../redux/water/operations.js";

import WaterModal from "../../modals/WaterModal/WaterModal";
import DeleteWaterModal from "../../modals/DeleteWaterModal/DeleteWaterModal.jsx";

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

  const items = useSelector(selectDayDetails);

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

  const [waterModalisOpen, setWaterModalisOpen] = useState(false);
  const openWaterModal = (item) => {
    setSelectedItem(item);
    setWaterModalisOpen(true);
  };
  const closeWaterModal = () => {
    setWaterModalisOpen(false);
    setSelectedItem(null);
  };

  const [isDeleteWaterModalOpen, setisDeleteWaterModalOpen] = useState(false);
  const openDeleteWaterModal = () => setisDeleteWaterModalOpen(true);
  const closeDeleteWaterModal = () => setisDeleteWaterModalOpen(false);

  return (
    <ul className={s.wrapper}>
      {Array.isArray(items) && items.length === 1 ? (
        // Якщо в масиві тільки один елемент
        <li>
          <WaterItem
            _id={items[0]._id}
            amount={items[0].amount}
            date={formatTime(items.date)}
            onEdit={() => openWaterModal(items[0])}
            openDeleteWaterModal={openDeleteWaterModal}
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
                  openWaterModal={openWaterModal}
                  onEdit={() => openWaterModal(item)}
                  openDeleteWaterModal={openDeleteWaterModal}
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
