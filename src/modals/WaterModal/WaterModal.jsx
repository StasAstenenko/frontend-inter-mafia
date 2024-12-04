import WaterForm from "../../components/WaterForm/WaterForm.jsx";
import { editWaterData, postWaterData } from "../../redux/water/operations.js";
import Modal from "../Modal/Modal.jsx";

const WaterModal = ({ operationType, data, isOpen, onClose }) => {
  const messages = {
    add: {
      title: "Add water",
      paragraph: "Choose a value",
      dispatchFunction: postWaterData,
    },
    edit: {
      title: "Edit the entered amount of water",
      paragraph: "Correct entered data",
      dispatchFunction: editWaterData,
    },
  };

  const initialValues =
    operationType === "add"
      ? { amountOfWater: 50, recordingTime: new Date() }
      : {
          amountOfWater: data?.amount || 0,
          recordingTime: new Date(data?.date || new Date()),
          _id: data?._id,
        };

  const { title, paragraph, dispatchFunction } = messages[operationType];

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <WaterForm
          title={title}
          paragraph={paragraph}
          initialValues={initialValues}
          dispatchFunction={dispatchFunction}
        />
      </Modal>
    </>
  );
};

export default WaterModal;
