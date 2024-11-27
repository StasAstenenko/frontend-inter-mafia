import ReactDOM from "react-dom";
import Icon from "../../components/Icon/Icon";
import UsersSettingsForm from "../../components/UsersSettingsForm/UsersSettingsForm";
import css from "./UserSettingsModal.module.css";

const UserSettingsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={css.settingModalOverlay}>
      <div className={css.settingModal}>
        <h2 className={css.settingModalTitle}>Setting</h2>
        <button className={css.settingModalButton} onClick={onClose}>
          <Icon
            iconName="close"
            width="24"
            height="24"
            className="css.settingModalIconClose"
          />
        </button>
        <UsersSettingsForm onClose={onClose} />
      </div>
    </div>,
    document.body
  );
};

export default UserSettingsModal;
