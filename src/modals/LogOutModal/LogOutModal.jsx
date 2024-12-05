import css from "./LogOutModal.module.css";
import Modal from "../Modal/Modal";

import { useDispatch } from "react-redux";
import { apiLogout } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { useLanguage } from "../../locales/langContext.jsx";

const LogOutModal = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const handleRedirect = () => {
    navigateTo("/");
  };

  const handleLogOut = () => {
    dispatch(apiLogout());
    onClose();
    handleRedirect();
    iziToast.success({
      title: "Done",
      message: "Successfully Logged Out!",
      displayMode: 1,
      position: "topRight",
      maxWidth: "300px",
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.modal_content}>
        <div className={css.wrapperText}>
          <h2 className={css.title}>{t("LogOut")}</h2>
          <p className={css.text}>{t("WannaLeave")}</p>
        </div>
        <div className={css.buttonContainer}>
          <button
            className={css.logoutBtn}
            type="button"
            aria-label="Logout button"
            onClick={handleLogOut}
          >
            {t("LogOut")}
          </button>
          <button
            className={css.cancelBtn}
            type="button"
            aria-label="Cancel button"
            onClick={onClose}
          >
            {t("Cancel")}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LogOutModal;
