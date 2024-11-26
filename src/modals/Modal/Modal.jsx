import ReactDOM from "react-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";
import "./Modal.module.css";
const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);
  if (!isOpen) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      {" "}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {" "}
        <button className="modal-close" onClick={onClose}>
          ×
        </button>{" "}
        {children}{" "}
      </div>{" "}
    </div>,
    document.getElementById("modal-root")
  );
};
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
export default Modal;
