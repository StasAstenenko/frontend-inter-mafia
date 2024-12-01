import css from "./DeleteWaterModal.module.css";
import Modal from "../Modal/Modal";

const DeleteWaterModal = ({ isOpen, onClose }) => {
  const handleDelete = () => {
    // логика удаления воды
    onClose();
    // оповещение с помощью Toast
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.modal_content}>
        <div className={css.wrapperText}>
          <h2 className={css.title}>Delete entry</h2>
          <p className={css.text}>Are you sure you want to delete the entry?</p>
        </div>
        <div className={css.buttonContainer}>
          <button
            className={css.deleteBtn}
            type="button"
            aria-label="Delete button"
            onClick={handleDelete}
          >
            Delete
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

export default DeleteWaterModal;
