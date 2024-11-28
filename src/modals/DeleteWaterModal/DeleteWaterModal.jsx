import css from "./DeleteWaterModal.module.css";
import Modal from "../Modal/Modal";

const DeleteWaterModal = () => {
  return (
    <Modal>
      <div className={css.modalWindow}>
        <div className={css.wrapperText}>
          <h2 className={css.title}>Delete entry</h2>
          <p className={css.text}>Are you sure you want to delete the entry?</p>
        </div>
        <div className={css.buttonContainer}>
          <button
            className={css.deleteBtn}
            type="button"
            aria-label="Delete button"
            // onClick={handleDelete}
          >
            Delete
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
    </Modal>
  );
};

export default DeleteWaterModal;
