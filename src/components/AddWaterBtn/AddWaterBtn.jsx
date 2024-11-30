// import { useState } from "react";
import css from "./AddWaterBtn.module.css";
import clsx from "clsx";

const AddWaterBtn = ({ variant = "default" }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  return (
    <>
      <div className={css.btnContainer}></div>
      <button
        type="button"
        className={clsx(
          css.addBtn,
          variant === "alt" ? css.addBtnAlt : css.defaultBtn
        )}
        // onClick={openModal}
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
      {/* {isModalOpen && <WaterModal type={"add"} />} */}
    </>
  );
};

export default AddWaterBtn;
