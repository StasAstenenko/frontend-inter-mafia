import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./SignUpForm.module.css";
import * as Yup from "yup";
import clsx from "clsx";

const SignUpForm = () => {
  const SignUpValidationSchema = Yup.object().shape({
    emailSignUp: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    passwordSignUp: Yup.string()
      .min(6, "Password must be at least 6 characters")
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
    console.log(values);
    actions.resetForm();
  };
  return (
    <>
      <h1 className={css.title}>SignUp</h1>
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
                type="password"
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
            </div>

            <div className={css.fieldWrap}>
              <label htmlFor="repeatPassword" className={css.label}>
                Repeat password
              </label>
              <Field
                id="repeatPassword"
                name="repeatPassword"
                placeholder="Repeat password"
                type="password"
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
