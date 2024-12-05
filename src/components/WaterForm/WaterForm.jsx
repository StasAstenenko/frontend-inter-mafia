import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import css from "./WaterForm.module.css";
import { GoPlus } from "react-icons/go";
import { GoDash } from "react-icons/go";
import { getWaterPerDay } from "../../redux/water/operations.js";
// import { selectDayDetails } from "../../redux/water/operations.js";
import { useLanguage } from "../../locales/langContext.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectChosenDate } from "../../redux/water/selectors";

const entriesValidationSchema = Yup.object().shape({
  amountOfWater: Yup.number()
    .required("Required")
    .min(50, "Amount of water has to be greater than 50ml")
    .max(5000, "Amount of water has to be less than 5000ml"),
  recordingTime: Yup.date().required("Required"),
});

const WaterForm = ({ title, paragraph, initialValues, dispatchFunction }) => {
  const { t } = useLanguage();
  const dispatch = useDispatch();

  // Отримуємо вибрану дату зі стейту
  const dateWeOn = useSelector(selectChosenDate);

  const handleSubmit = async (values) => {
    // Форматуємо дату, використовуючи вибрану дату зі стейту
    const chosenDate = dateWeOn ? new Date(dateWeOn) : new Date();
    const formattedTime = values.recordingTime
      ? values.recordingTime.toISOString().split(".")[0]
      : new Date().toISOString().split(".")[0];

    // Форматуємо дату для запису
    chosenDate.setHours(
      values.recordingTime
        ? values.recordingTime.getHours()
        : new Date().getHours()
    );
    chosenDate.setMinutes(
      values.recordingTime
        ? values.recordingTime.getMinutes()
        : new Date().getMinutes()
    );
    chosenDate.setSeconds(0);
    chosenDate.setMilliseconds(0);

    // const today = new Date().toISOString().split("T")[0];

    // await dispatch(getWaterPerDay(today));

    const entries = {
      amount: values.amountOfWater,
      date: chosenDate.toISOString().split(".")[0], // Зберігаємо в форматі ISO
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
    // dispatch(getWaterPerDay(chosenDate));
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
                <p className={css.amountParagraph}>{t("AmountOfWater")}</p>
                <div className={css.inputWrapper}>
                  <button
                    type="button"
                    className={css.ctrlBtn}
                    onClick={handleDecrease}
                  >
                    <GoDash className={css.btnIcon} />
                  </button>
                  <div className={css.valueDisplay}>
                    <span>
                      {values.amountOfWater} {t("Ml")}
                    </span>
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
                <p className={css.recordingTime}>{t("RecordingTime")}</p>
                <Field name="recordingTime">
                  {({ field, form }) => (
                    <input
                      type="time"
                      {...field}
                      value={
                        field.value
                          ? field.value.toTimeString().slice(0, 5)
                          : ""
                      }
                      onChange={(e) => {
                        const timeString = e.target.value;
                        if (timeString) {
                          const date = new Date();
                          const [hours, minutes] = timeString.split(":");
                          date.setHours(parseInt(hours, 10));
                          date.setMinutes(parseInt(minutes, 10));
                          date.setSeconds(0);
                          date.setMilliseconds(0);
                          form.setFieldValue("recordingTime", date);
                        }
                      }}
                      className={`${css.field} custom-datepicker-input`}
                    />
                  )}
                </Field>
              </label>
              <ErrorMessage
                className={css.err}
                name="recordingTime"
                component="span"
              />
              <label className={css.label}>
                <p className={css.enterValue}>{t("ValueOfWater")}</p>
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
                {t("Save")}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default WaterForm;
