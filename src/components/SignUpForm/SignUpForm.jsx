import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./SignUpForm.module.css";
import * as Yup from "yup";
import clsx from "clsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { apiRegister } from "../../redux/auth/operations";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    repeatPassword: false,
  });
  const togglePasswordView = (btnName) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [btnName]: !prev[btnName],
    }));
  };

  const SignUpValidationSchema = Yup.object().shape({
    emailSignUp: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    passwordSignUp: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password must be less than 50 characters")
      .required("Password is required"),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("passwordSignUp")], "Passwords must match")
      .required("Please confirm your password"),
  });

  const initialValues = {
    emailSignUp: "",
    passwordSignUp: "",
    repeatPassword: "",
  };
  const handleSubmit = (values, actions) => {
    const email = values.emailSignUp;
    const password = values.passwordSignUp;
    const registerObj = { email, password };
    // console.log(registerObj);
    dispatch(apiRegister(registerObj));
    console.log("Form submitted, dispatch work");
    actions.resetForm();
  };

  return (
    <>
      {/* <h1 className={css.title}>SignUp</h1> */}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={SignUpValidationSchema}
      >
        {({ errors, touched }) => (
          <Form className={css.form}>
            <div className={css.fieldWrap}>
              <label htmlFor="emailSignUp" className={css.label}>
                Email
              </label>
              <Field
                id="emailSignUp"
                name="emailSignUp"
                placeholder="Enter your email"
                type="email"
                className={clsx(css.input, {
                  [css.inputError]: errors.emailSignUp && touched.emailSignUp,
                })}
                autoComplete="email"
              />
              <ErrorMessage
                name="emailSignUp"
                component="span"
                className={css.errorMsg}
              />
            </div>
            <div className={css.fieldWrap}>
              <label htmlFor="passwordSignUp" className={css.label}>
                Password
              </label>
              <Field
                id="passwordSignUp"
                name="passwordSignUp"
                placeholder="Enter your password"
                type={passwordVisibility.password ? "text" : "password"}
                className={clsx(css.input, {
                  [css.inputError]:
                    errors.passwordSignUp && touched.passwordSignUp,
                })}
                autoComplete="new-password"
              />
              <ErrorMessage
                name="passwordSignUp"
                component="span"
                className={css.errorMsg}
              />
              <button
                type="button"
                className={css.toggleViewBtn}
                onClick={() => togglePasswordView("password")}
              >
                {!passwordVisibility.password ? (
                  <svg width="20" height="20" className={css.icon}>
                    <use href="/icons/sprite.svg#eye-close"></use>
                  </svg>
                ) : (
                  <svg width="20" height="20" className={css.icon}>
                    <use href="/icons/sprite.svg#eye"></use>
                  </svg>
                )}
              </button>
            </div>

            <div className={css.fieldWrap}>
              <label htmlFor="repeatPassword" className={css.label}>
                Repeat password
              </label>
              <Field
                id="repeatPassword"
                name="repeatPassword"
                placeholder="Repeat password"
                type={passwordVisibility.repeatPassword ? "text" : "password"}
                className={clsx(css.input, {
                  [css.inputError]:
                    errors.repeatPassword && touched.repeatPassword,
                })}
                autoComplete="new-password"
              />
              <ErrorMessage
                name="repeatPassword"
                component="span"
                className={css.errorMsg}
              />
              <button
                type="button"
                className={css.toggleViewBtn}
                onClick={() => togglePasswordView("repeatPassword")}
              >
                {!passwordVisibility.repeatPassword ? (
                  <svg width="20" height="20" className={css.icon}>
                    <use href="/icons/sprite.svg#eye-close"></use>
                  </svg>
                ) : (
                  <svg width="20" height="20" className={css.icon}>
                    <use href="/icons/sprite.svg#eye"></use>
                  </svg>
                )}
              </button>
            </div>

            <button type="submit" className={css.btn}>
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignUpForm;
