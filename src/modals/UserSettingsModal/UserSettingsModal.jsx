import ReactDOM from "react-dom";
import UsersSettingsForm from "../../components/UsersSettingsForm/UsersSettingsForm";
import css from "./UserSettingsModal.module.css";
import { useEffect } from "react";

const UserSettingsModal = ({ onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className={css.settingModalOverlay} onClick={handleOverlayClick}>
      <div className={css.settingModal} onClick={(e) => e.stopPropagation()}>
        <div className={css.settingModalHeader}>
          <h2 className={css.settingModalTitle}>Setting</h2>
          <button className={css.settingModalButton} onClick={onClose}>
            <svg width="24" height="24" className={css.settingModalIcon}>
              <use href="/icons/sprite.svg#close"></use>
            </svg>
          </button>
        </div>

        <div className={css.settingModalContent}>
          <UsersSettingsForm onClose={onClose} />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default UserSettingsModal;
