import ReactDOM from "react-dom";
import UsersSettingsForm from "../../components/UsersSettingsForm/UsersSettingsForm";
import css from "./UserSettingsModal.module.css";

const UserSettingsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={css.settingModalOverlay}>
      <div className={css.settingModal}>
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
