import { useState } from "react";
import css from "./AddWaterBtn.module.css";
import clsx from "clsx";
import WaterModal from "../../modals/WaterModal/WaterModal.jsx";

const AddWaterBtn = ({ variant = "default" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={css.btnContainer}></div>
      <button
        type="button"
        className={clsx(
          css.addBtn,
          variant === "alt" ? css.addBtnAlt : css.defaultBtn
        )}
        onClick={openModal}
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
      {isModalOpen && (
        <WaterModal
          operationType={"add"}
          isOpen={isModalOpen}
          onClose={openModal}
        />
      )}
    </>
  );
};

export default AddWaterBtn;
