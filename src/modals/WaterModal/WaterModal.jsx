import WaterForm from "../../components/WaterForm/WaterForm.jsx";
import { editWaterData, postWaterData } from "../../redux/water/operations.js";
import Modal from "../Modal/Modal.jsx";
import { useLanguage } from "../../locales/langContext.jsx";

const WaterModal = ({ operationType, data, isOpen, onClose }) => {
  const { t } = useLanguage();
  const messages = {
    add: {
      title: t("AddWater"),
      paragraph: t("ChooseAWater"),
      dispatchFunction: postWaterData,
    },
    edit: {
      title: t("EditAmount"),
      paragraph: t("CorrectData"),
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
