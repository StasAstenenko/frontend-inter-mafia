import { useState } from "react";
import css from "./AddWaterBtn.module.css";
import clsx from "clsx";

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
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5V19"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 12H19"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Add water
      </button>
      {isModalOpen && <WaterModal type={"add"} />}
    </>
  );
};

export default AddWaterBtn;
