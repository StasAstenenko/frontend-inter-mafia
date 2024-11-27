import css from "./LogOutModal.module.css";

// import { useDispatch } from "react-redux";
// import { logOut } from "../../redux/auth/operations";

const LogOutModal = () => {
  // const dispatch = useDispatch();
  // const closeModal = ? ;

  return (
    <div className={css.modalWindow}>
      <div className={css.wrapperText}>
        <h2 className={css.title}>Log Out</h2>
        <p className={css.text}>Do you really want to leave?</p>
      </div>
      <div className={css.buttonContainer}>
        <button
          className={css.logoutBtn}
          type="button"
          aria-label="Logout button"
          // onClick={() => {
          //   dispatch(logOut());
          //   closeModal();
          // }}
          // Плюс не забыть оповещение с помощью Toast
        >
          Log Out
        </button>
        <button
          className={css.cancelBtn}
          type="button"
          aria-label="Cancel button"
          // onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogOutModal;
