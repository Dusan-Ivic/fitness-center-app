import React, { useEffect } from "react";
import "../assets/styles/Form.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Formik } from "formik";
import * as Yup from "yup";
import { registerVisitor, reset } from "../features/users/usersSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const registerSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Email is not valid"),
  username: Yup.string()
    .required("Username is required")
    .min(6, "Username should be at least 6 characters long"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password should be at least 8 characters long"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  gender: Yup.string().required("Gender is required"),
  birthdate: Yup.date()
    .required("Birthdate is required")
    .max(new Date(), "Birthdate must be in the past"),
});

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (isError) {
      console.error(message);
    }

    if (isSuccess) {
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
        email: "",
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        gender: "",
        birthdate: "",
      }}
      validationSchema={registerSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        dispatch(registerVisitor(values));
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
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email ? (
              <div className="error-message">{errors.email}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
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
            />
            {errors.password && touched.password ? (
              <div className="error-message">{errors.password}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="Enter first name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
            />
            {errors.firstName && touched.firstName ? (
              <div className="error-message">{errors.firstName}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Enter last name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
            />
            {errors.lastName && touched.lastName ? (
              <div className="error-message">{errors.lastName}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              type="text"
              name="gender"
              placeholder="Enter gender"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.gender}
            />
            {errors.gender && touched.gender ? (
              <div className="error-message">{errors.gender}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="birthdate">
            <Form.Label>Birthdate</Form.Label>
            <Form.Control
              type="date"
              name="birthdate"
              placeholder="Enter birthdate"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.birthdate}
            />
            {errors.birthdate && touched.birthdate ? (
              <div className="error-message">{errors.birthdate}</div>
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

export default RegisterForm;
