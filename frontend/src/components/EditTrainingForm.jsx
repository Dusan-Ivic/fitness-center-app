import React from "react";
import "../styles/Form.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";

const updateTrainingSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  type: Yup.string().required("Type is required"),
  startingTime: Yup.date()
    .required("Starting time is required")
    .min(new Date(), "Starting time must be in the future"),
  duration: Yup.number()
    .required("Duration is required")
    .moreThan(0, "Duration must be a positive number"),
  maxVisitors: Yup.number()
    .required("Visitor limit is required")
    .moreThan(0, "Visitor limit must be a positive number"),
});

const EditTrainingForm = ({ training }) => {
  return (
    <Formik
      initialValues={{
        name: training.name,
        type: training.type,
        startingTime: moment(training.startingTime).format("YYYY-MM-DDTHH:mm"),
        duration: training.duration,
        maxVisitors: training.maxVisitors,
      }}
      validationSchema={updateTrainingSchema}
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
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              className={`border border-2 ${
                errors.name ? "border-danger" : "border-success"
              }`}
            />
            {errors.name && touched.name ? (
              <div className="error-message">{errors.name}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="text"
              name="type"
              placeholder="Enter type"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.type}
              className={`border border-2 ${
                errors.type ? "border-danger" : "border-success"
              }`}
            />
            {errors.type && touched.type ? (
              <div className="error-message">{errors.type}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="startingTime">
            <Form.Label>Starting time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="startingTime"
              placeholder="Enter starting time"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.startingTime}
              className={`border border-2 ${
                errors.startingTime ? "border-danger" : "border-success"
              }`}
            />
            {errors.startingTime && touched.startingTime ? (
              <div className="error-message">{errors.startingTime}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="duration">
            <Form.Label>Duration</Form.Label>
            <Form.Control
              type="number"
              name="duration"
              placeholder="Enter duration"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.duration}
              className={`border border-2 ${
                errors.duration ? "border-danger" : "border-success"
              }`}
            />
            {errors.duration && touched.duration ? (
              <div className="error-message">{errors.duration}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="maxVisitors">
            <Form.Label>Max visitors</Form.Label>
            <Form.Control
              type="number"
              name="maxVisitors"
              placeholder="Enter visitor limit"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.maxVisitors}
              className={`border border-2 ${
                errors.maxVisitors ? "border-danger" : "border-success"
              }`}
            />
            {errors.maxVisitors && touched.maxVisitors ? (
              <div className="error-message">{errors.maxVisitors}</div>
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

export default EditTrainingForm;
