import css from "./LogOutModal.module.css";
import Modal from "../Modal/Modal";

import { useDispatch } from "react-redux";
import { apiLogout } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";

// import toast from "react-hot-toast";

const LogOutModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const navigateTo = useNavigate();
  const handleRedirect = () => {
    navigateTo("/"); // переадресация на главную страницу
  };

  const handleLogOut = () => {
    dispatch(apiLogout());
    onClose();
    handleRedirect();
    // вставить оповещение с помощью Toast, типа:
    // toast.success('Successfully logged Out!')
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.modal_content}>
        <div className={css.wrapperText}>
          <h2 className={css.title}>Log Out</h2>
          <p className={css.text}>Do you really want to leave?</p>
        </div>
        <div className={css.buttonContainer}>
          <button
            className={css.logoutBtn}
            type="button"
            aria-label="Logout button"
            onClick={handleLogOut}
          >
            Log Out
          </button>
          <button
            className={css.cancelBtn}
            type="button"
            aria-label="Cancel button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LogOutModal;
