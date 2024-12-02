// import { useDispatch, useSelector } from "react-redux";
import WaterItem from "../WaterItem/WaterItem";
import s from "./WaterList.module.css";
// import { useEffect } from "react";
// import { fetchWaterItems } from "../../redux/water/operations";
const WaterList = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchWaterItems());
  // }, [dispatch]);
  return (
    <ul className={s.wrapper}>
      <WaterItem />
      <WaterItem />
      <WaterItem />
      {/* {items.map((item) => {
        return (
          <li key={item._id}>
            <WaterItem
              id={item._id}
              amount={item.amount}
              createdAt={createdAt}
            />
          </li>
        );
      })} */}
    </ul>
  );
};

export default WaterList;
