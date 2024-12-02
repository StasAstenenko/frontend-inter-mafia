import { useState } from "react";
import css from "./AddWaterBtn.module.css";
import clsx from "clsx";

import WaterModal from "../../modals/WaterModal/WaterModal.jsx";

const AddWaterBtn = ({ variant = "default" }) => {
  const [logOutModalisOpen, setLogOutModalisOpen] = useState(false);
  const openLogOutModal = () => setLogOutModalisOpen(true);
  const closeLogOutModal = () => setLogOutModalisOpen(false);

  return (
    <>
      <div className={css.btnContainer}></div>
      <button
        type="button"
        className={clsx(
          css.addBtn,
          variant === "alt" ? css.addBtnAlt : css.defaultBtn
        )}
        onClick={openLogOutModal}
      >
        <svg
          className={clsx(css.icon, variant === "alt" && css.iconAlt)}
          width="24"
          height="24"
        >
          <use href="/icons/sprite.svg#plus-add-water" />
        </svg>
        Add water
      </button>
      <WaterModal
        isOpen={logOutModalisOpen}
        onClose={closeLogOutModal}
        operationType="add"
      />
    </>
  );
};

export default AddWaterBtn;
