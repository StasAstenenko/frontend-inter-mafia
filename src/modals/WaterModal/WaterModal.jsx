import WaterForm from "../../components/WaterForm/WaterForm.jsx";

const WaterModal = ({ operationType, data }) => {
  const messages = {
    add: {
      title: "Add water",
      paragraph: "Choose a value",
    },
    edit: {
      title: "Edit the entered amount of water",
      paragraph: "Correct entered data",
    },
  };

  const initialValues =
    operationType === "add"
      ? { amountOfWater: 50, recordingTime: new Date() }
      : {
          ...data,
          recordingTime: new Date(`1970-01-01T${data.recordingTime}:00`),
        };

  const { title, paragraph } = messages[operationType];

  return (
    <>
      <WaterForm
        title={title}
        paragraph={paragraph}
        initialValues={initialValues}
      />
    </>
  );
};

export default WaterModal;
