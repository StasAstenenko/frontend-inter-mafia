import { useState } from "react";
import css from "./AddWaterBtn.module.css";

const AddWaterBtn = () => {
  const [, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <>
      <button type="button" className={css.addBtn} onClick={openModal}>
        <svg
          className={css.icon}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5V19"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 12H19"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Add water
      </button>
      {/* {isModalOpen && <WaterModal onClose={closeModal} />} */}
    </>
  );
};

export default AddWaterBtn;
