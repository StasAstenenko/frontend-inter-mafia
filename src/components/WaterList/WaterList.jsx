// import { useDispatch, useSelector } from "react-redux";

import { Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";

import WaterItem from "../WaterItem/WaterItem";
import s from "./WaterList.module.css";
import { useSelector } from "react-redux";
import { selectWaterItems } from "../../redux/water/selectors";
const WaterList = () => {
  const items = useSelector(selectWaterItems);
  console.log(items);
  return (
    <ul className={s.wrapper}>
      <Swiper
        // install Swiper modules
        modules={[Scrollbar]}
        spaceBetween={8}
        slidesPerView={2}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          {items.map((item) => {
            return (
              <li key={item._id}>
                <WaterItem
                  id={item._id}
                  amount={item.amount}
                  createdAt={item.createdAt}
                />
              </li>
            );
          })}
        </SwiperSlide>
        <div className={s.swiperScrollbar}></div> {/* Елемент скроллбара */}
      </Swiper>
    </ul>
  );
};

export default WaterList;
