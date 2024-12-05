import { useDispatch } from "react-redux";
import { deleteWaterItem } from "../../redux/water/operations";
// import { useState } from "react";
// import WaterModal from "../../modals/WaterModal/WaterModal";
import s from "./WaterItem.module.css";
const WaterItem = ({ _id, amount, date, onEdit }) => {
  // const [logOutModalisOpen, setLogOutModalisOpen] = useState(false);
  // const openLogOutModal = () => setLogOutModalisOpen(true);
  // const closeLogOutModal = () => setLogOutModalisOpen(false);
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteWaterItem(_id));

  return (
    <div className={s.mainwrapper}>
      <div className={s.wrapper}>
        <svg className={s.waterglass}>
          <use href="/icons/sprite.svg#water-glass"></use>
        </svg>
        <div>
          <p className={s.amount}>{amount} ml</p>
          <p className={s.time}>{date}</p>
        </div>
        <div className={s.container}>
          <button onClick={onEdit} className={s.btn}>
            <svg className={s.edit}>
              <use href="/icons/sprite.svg#edit"></use>
            </svg>
          </button>
          <button className={s.btn} onClick={handleDelete}>
            <svg className={s.trash}>
              <use href="/icons/sprite.svg#trash"></use>
            </svg>
          </button>
        </div>
      </div>
      {/* <WaterModal
        isOpen={logOutModalisOpen}
        onClose={closeLogOutModal}
        operationType="add"
      /> */}
    </div>
  );
};

export default WaterItem;
