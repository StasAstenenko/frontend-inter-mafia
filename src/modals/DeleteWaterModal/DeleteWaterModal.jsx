import css from "./DeleteWaterModal.module.css";
import Modal from "../Modal/Modal";
import { useDispatch } from "react-redux";
import { deleteWaterItem } from "../../redux/water/operations";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const DeleteWaterModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleDelete = (_id) => {
    dispatch(deleteWaterItem(_id));
    onClose();
    iziToast.success({
      title: "Done",
      message: "Entry deleted successfully!",
      displayMode: 1,
      position: "topRight",
      maxWidth: "300px",
    });
    // актуализировать с помощью redux данные в WaterProgressBar, WaterList та Calendar
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
