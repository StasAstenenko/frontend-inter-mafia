import css from "./DeleteWaterModal.module.css";

const DeleteWaterModal = () => {
  return (
    <div className={css.modalWindow}>
      <div className={css.wrapperText}>
        <h2 className={css.title}>Delete entry</h2>
        <p className={css.text}>Are you sure you want to delete the entry?</p>
      </div>
      <div className={css.buttonContainer}>
        <button className={css.deleteBtn}>Delete</button>
        <button className={css.cancelBtn}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteWaterModal;
