// import { useDispatch } from "react-redux";
// import { deleteWaterItem } from "../../redux/water/operations";
import s from "./WaterItem.module.css";
const WaterItem = () => {
  // const dispatch = useDispatch();
  return (
    <div>
      <div className={s.wrapper}>
        <svg width="44" height="45" className={s.waterglass}>
          <use href="/icons/sprite.svg#water-glass"></use>
        </svg>
        <div>
          <p className={s.amount}>250 ml</p>
          <p className={s.time}>7:00 AM</p>
        </div>
        <div className={s.container}>
          <svg width="16" height="16" className={s.edit}>
            <use href="/icons/sprite.svg#edit"></use>
          </svg>
          <svg width="16" height="16" className={s.trash}>
            <use href="/icons/sprite.svg#trash"></use>
          </svg>
        </div>
      </div>
      {/* icon
      <div>
        <p>{amount} ml</p>
        <p>{createdAt}</p>
      </div>
      <div>
        <button onClick={() => dispatch(deleteWaterItem(_id))} type="button">
          icon
        </button>
        <button onClick={() => dispatch(deleteItem(_id))} type="button">
          icon
        </button>
      </div> */}
    </div>
  );
};

export default WaterItem;
