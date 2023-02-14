import React from "react";
import "../styles/Form.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import moment from "moment";

const updateSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Email is not valid"),
  username: Yup.string()
    .required("Username is required")
    .min(6, "Username should be at least 6 characters long"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  gender: Yup.string().required("Gender is required"),
  birthdate: Yup.date()
    .required("Birthdate is required")
    .max(new Date(), "Birthdate must be in the past"),
});

const EditProfileForm = () => {
  const { user } = useSelector((state) => state.users);

  return (
    <Formik
      initialValues={{
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        birthdate: user.birthdate,
      }}
      validationSchema={updateSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
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
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className={`border border-2 ${
                errors.email ? "border-danger" : "border-success"
              }`}
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
              className={`border border-2 ${
                errors.username ? "border-danger" : "border-success"
              }`}
            />
            {errors.username && touched.username ? (
              <div className="error-message">{errors.username}</div>
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
              className={`border border-2 ${
                errors.firstName ? "border-danger" : "border-success"
              }`}
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
              className={`border border-2 ${
                errors.lastName ? "border-danger" : "border-success"
              }`}
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
              className={`border border-2 ${
                errors.gender ? "border-danger" : "border-success"
              }`}
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
              value={moment(values.birthdate).format("YYYY-MM-DD")}
              className={`border border-2 ${
                errors.birthdate ? "border-danger" : "border-success"
              }`}
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

export default EditProfileForm;
