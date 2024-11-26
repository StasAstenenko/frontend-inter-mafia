import css from "./LogOutModal.module.css";

const LogOutModal = () => {
  return (
    <div className={css.modalWindow}>
      <div className={css.wrapperText}>
        <h2 className={css.title}>Log Out</h2>
        <p className={css.text}>Do you really want to leave?</p>
      </div>
      <div className={css.buttonContainer}>
        <button className={css.logoutBtn}>Log Out</button>
        <button className={css.cancelBtn}>Cancel</button>
      </div>
    </div>
  );
};

export default LogOutModal;
