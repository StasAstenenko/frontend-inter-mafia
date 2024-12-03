// import { useDispatch } from "react-redux";
// import { deleteWaterItem } from "../../redux/water/operations";
import { useState } from "react";
import WaterModal from "../../modals/WaterModal/WaterModal";
import s from "./WaterItem.module.css";
const WaterItem = () => {
  const [logOutModalisOpen, setLogOutModalisOpen] = useState(false);
  const openLogOutModal = () => setLogOutModalisOpen(true);
  const closeLogOutModal = () => setLogOutModalisOpen(false);
  // const dispatch = useDispatch();
  return (
    <div>
      <div className={s.wrapper}>
        <svg className={s.waterglass}>
          <use href="/icons/sprite.svg#water-glass"></use>
        </svg>
        <div>
          <p className={s.amount}>250 ml</p>
          <p className={s.time}>7:00 AM</p>
        </div>
        <div className={s.container}>
          <button onClick={openLogOutModal} className={s.btn}>
            <svg className={s.edit}>
              <use href="/icons/sprite.svg#edit"></use>
            </svg>
          </button>
          <button className={s.btn}>
            <svg className={s.trash}>
              <use href="/icons/sprite.svg#trash"></use>
            </svg>
          </button>
        </div>
      </div>
      <WaterModal
        isOpen={logOutModalisOpen}
        onClose={closeLogOutModal}
        operationType="add"
      />
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
