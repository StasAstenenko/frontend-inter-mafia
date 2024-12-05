import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./WaterForm.module.css";
import { GoPlus } from "react-icons/go";
import { GoDash } from "react-icons/go";
import { getWaterPerDay } from "../../redux/water/operations.js";
import { useDispatch } from "react-redux";

const entriesValidationSchema = Yup.object().shape({
  amountOfWater: Yup.number()
    .required("Required")
    .min(50, "Amount of water has to be greater than 50ml")
    .max(5000, "Amount of water has to be less than 5000ml"),
  recordingTime: Yup.date().required("Required"),
});

const WaterForm = ({ title, paragraph, initialValues, dispatchFunction }) => {
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    const formattedTime = values.recordingTime
      ? values.recordingTime.toISOString().split(".")[0]
      : new Date().toISOString().split(".")[0];
    console.log(formattedTime);
    const today = new Date().toISOString().split("T")[0];

    await dispatch(getWaterPerDay(today));
    const entries = {
      amount: values.amountOfWater,
      date: formattedTime,
    };
    if (initialValues._id) {
      await dispatch(
        dispatchFunction({
          waterId: initialValues._id,
          entries,
        })
      );
    } else {
      await dispatch(dispatchFunction(entries));
    }
    await dispatch(getWaterPerDay(today));
  };
  return (
    <div className={css.wrapper}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={entriesValidationSchema}
        enableReinitialize={true}
      >
        {({ setFieldValue, values }) => {
          const handleIncrease = () => {
            const newAmount = Math.min((values.amountOfWater || 50) + 50, 5000);
            setFieldValue("amountOfWater", newAmount);
          };
          const handleDecrease = () => {
            const newAmount = Math.max((values.amountOfWater || 50) - 50, 50);
            setFieldValue("amountOfWater", newAmount);
          };
          const handleInputChange = (e) => {
            const inputValue = e.target.value.trim();
            if (inputValue && !isNaN(inputValue)) {
              setFieldValue("amountOfWater", Number(inputValue));
            }
          };

          return (
            <Form className={css.form}>
              <p className={css.addWater}>{title}</p>
              <p className={css.chooseAValue}>{paragraph}:</p>
              <div className={css.customInput}>
                <p className={css.amountParagraph}>Amount of water:</p>
                <div className={css.inputWrapper}>
                  <button
                    type="button"
                    className={css.ctrlBtn}
                    onClick={handleDecrease}
                  >
                    <GoDash className={css.btnIcon} />
                  </button>
                  <div className={css.valueDisplay}>
                    <span>{values.amountOfWater} ml</span>
                  </div>
                  <button
                    type="button"
                    className={css.ctrlBtn}
                    onClick={handleIncrease}
                  >
                    <GoPlus className={css.btnIcon} />
                  </button>
                </div>
              </div>
              <label className={css.label}>
                <p className={css.recordingTime}>Recording time:</p>
                <DatePicker
                  selected={values.recordingTime}
                  onChange={(date) => setFieldValue("recordingTime", date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={1}
                  timeCaption="Time"
                  dateFormat="HH:mm"
                  timeFormat="HH:mm"
                  className={`${css.field} custom-datepicker-input`}
                />
              </label>
              <ErrorMessage
                className={css.err}
                name="recordingTime"
                component="span"
              />
              <label className={css.label}>
                <p className={css.enterValue}>
                  Enter the value of the water used:
                </p>
                <Field
                  className={css.amountOfWaterField}
                  type="text"
                  name="amountOfWater"
                  value={values.amountOfWater}
                  onChange={handleInputChange}
                />
              </label>
              <ErrorMessage
                className={css.err}
                name="amountOfWater"
                component="span"
              />
              <button type="submit" className={css.submitBtn}>
                Save
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default WaterForm;
