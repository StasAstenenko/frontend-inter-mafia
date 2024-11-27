import { useEffect } from "react";
import css from "./Modal.module.css";
import { icons as sprite } from "../../icons/index";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);
  if (!isOpen) {
    return null;
  }
  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modalWindow} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          aria-label="Close modal button"
          className={css.closeBtn}
          onClick={onClose}
        >
          <svg className={css.closeIcon}>
            <use xlinkHref={`${sprite}#close`} />
          </svg>
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
