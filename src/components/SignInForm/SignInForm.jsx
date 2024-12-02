import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import css from "./SignInForm.module.css";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { apiLogin } from "../../redux/auth/operations";

const LoginValidationSchema = Yup.object({
  email: Yup.string().email("Incorrect email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Must be at least 8 characters")
    .max(50, "Must be less than 50 characters"),
});

const SignInForm = () => {
  const dispatch = useDispatch();
  const isTabletAndDesktop = useMediaQuery({ minWidth: 768 });
  const [openEye, setOpenEye] = useState(false);

  const initialValue = {
    email: "",
    password: "",
  };

  function handleOpenEye() {
    setOpenEye(!openEye);
  }

  function handleSubmit(values) {
    dispatch(apiLogin(values));
  }

  return (
    <div className={css.container}>
      <h3 className={css.signInTitle}>Sign In</h3>
      <Formik
        initialValues={initialValue}
        onSubmit={handleSubmit}
        validationSchema={LoginValidationSchema}
      >
        {({ touched, errors }) => (
          <Form className={css.form}>
            <div className={css.emailContainer}>
              <label htmlFor="email" className={css.label}>
                Email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className={clsx(css.inputForm, {
                  [css.inputFormError]: touched.email && errors.email,
                })}
                autoComplete="off"
              />
              <ErrorMessage
                name="email"
                component="label"
                className={`${css.error} ${css.errorMail}`}
              />
            </div>

            <div className={css.passwordContainer}>
              <label htmlFor="password" className={css.label}>
                Password
              </label>
              <Field
                type={!openEye ? "password" : "text"}
                name="password"
                id="password"
                placeholder="Enter your password"
                className={clsx(css.inputForm, {
                  [css.inputFormError]: touched.password && errors.password,
                })}
              />
              {isTabletAndDesktop && (
                <button
                  type="button"
                  className={css.closeEyeBtn}
                  onClick={handleOpenEye}
                >
                  {!openEye ? (
                    <svg width="20" height="20" className={css.closeEye}>
                      <use href="/icons/sprite.svg#eye-close"></use>
                    </svg>
                  ) : (
                    <svg width="20" height="20" className={css.closeEye}>
                      <use href="/icons/sprite.svg#eye"></use>
                    </svg>
                  )}
                </button>
              )}
              <ErrorMessage
                name="password"
                component="label"
                className={`${css.error} ${css.errorPass}`}
              />
            </div>
            <button type="submit" className={css.submitBtn}>
              Sign In
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;
