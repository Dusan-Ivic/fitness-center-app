import React, { useEffect } from "react";
import "../styles/Form.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Formik } from "formik";
import * as Yup from "yup";
import { loginUser, reset } from "../features/users/usersSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { notifySuccess, notifyError } from "../utils/notify";

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(6, "Username should be at least 6 characters long"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password should be at least 8 characters long"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (isError) {
      notifyError(message);
    }

    if (isSuccess) {
      notifySuccess(message);
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        dispatch(loginUser(values));
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
