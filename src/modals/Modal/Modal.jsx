import { useEffect } from "react";
import css from "./Modal.module.css";

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
      <div className={css.modalWindow}>
        <button
          type="button"
          aria-label="Close modal button"
          className={css.closeBtn}
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
