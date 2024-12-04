import WaterForm from "../../components/WaterForm/WaterForm.jsx";
import Modal from "../Modal/Modal.jsx";
import { useLanguage } from "../../locales/langContext.jsx";

const WaterModal = ({ operationType, data, isOpen, onClose }) => {
  const { t } = useLanguage();
  const messages = {
    add: {
      title: t("AddWater"),
      paragraph: t("ChooseAWater"),
    },
    edit: {
      title: t("EditAmount"),
      paragraph: t("CorrectData"),
    },
  };

  const initialValues =
    operationType === "add"
      ? { amountOfWater: 50, recordingTime: new Date() }
      : {
          ...data,
          recordingTime: new Date(),
        };

  const { title, paragraph } = messages[operationType];

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <WaterForm
          title={title}
          paragraph={paragraph}
          initialValues={initialValues}
        />
      </Modal>
    </>
  );
};

export default WaterModal;
