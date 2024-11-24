import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import css from "./SignInForm.module.css";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

const LoginValidationSchema = Yup.object({
  email: Yup.string().email("Incorrect email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Must be at least 8 characters")
    .max(50, "Must be less than 50 characters"),
});

const SignInForm = () => {
  const initialValue = {
    email: "",
    password: "",
  };

  function handleSubmit(name, password) {
    console.log(name, password);
  }

  return (
    <section className={css.signInSection}>
      <div className={css.container}>
        <h2 className={css.title}>AquaTrack</h2>
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
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className={clsx(css.inputForm, {
                    [css.inputFormError]: touched.email && errors.email,
                  })}
                />
                <ErrorMessage
                  name="email"
                  component="label"
                  className={css.error}
                />
              </div>

              <div className={css.passwordContainer}>
                <label htmlFor="password" className={css.label}>
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className={clsx(css.inputForm, {
                    [css.inputFormError]: touched.password && errors.password,
                  })}
                />
                <ErrorMessage
                  name="password"
                  component="label"
                  className={css.error}
                />
              </div>
              <button type="submit" className={css.submitBtn}>
                Sign In
              </button>
              <p className={css.desc}>
                Don&#039;t have an account?{" "}
                <NavLink to="/signup" className={css.signup}>
                  Sign Up
                </NavLink>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default SignInForm;
