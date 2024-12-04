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

  return (
    <ul className={s.wrapper}>
      <Swiper
        modules={[Scrollbar]}
        spaceBetween={8}
        slidesPerView={3}
        scrollbar={{ draggable: true }}
      >
        {Array.isArray(items) &&
          items.map((item, index) => (
            <SwiperSlide key={item._id || index}>
              <WaterItem
                _id={item._id}
                amount={item.amount}
                createdAt={item.createdAt}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </ul>
  );
};

export default WaterList;
