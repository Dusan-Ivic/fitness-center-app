import React from "react";
import "../assets/styles/Form.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(6, "Username should be at least 6 characters long"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password should be at least 8 characters long"),
});

const LoginForm = () => {
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        // TODO - Handle login
        console.log(values);
        resetForm();
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              className={`border border-2 ${
                touched.username
                  ? errors.username
                    ? "border-danger"
                    : "border-success"
                  : ""
              }`}
            />
            {errors.username && touched.username ? (
              <div className="error-message">{errors.username}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              className={`border border-2 ${
                touched.password
                  ? errors.password
                    ? "border-danger"
                    : "border-success"
                  : ""
              }`}
            />
            {errors.password && touched.password ? (
              <div className="error-message">{errors.password}</div>
            ) : null}
          </Form.Group>

          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
