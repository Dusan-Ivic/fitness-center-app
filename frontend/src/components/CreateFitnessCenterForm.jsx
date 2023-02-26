import React, { useEffect } from "react";
import "../styles/Form.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Formik } from "formik";
import * as Yup from "yup";
import { createCenter, reset } from "../features/centers/centersSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { notifySuccess, notifyError } from "../utils/notify";

const createFitnessCenterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  openingDate: Yup.date()
    .required("Opening date is required")
    .max(new Date(), "Opening date must be in the past"),
  monthlyMembershipFee: Yup.number()
    .required("Monthly membership fee is required")
    .moreThan(0, "Monthly membership fee must be a positive number"),
  annualMembershipFee: Yup.number()
    .required("Annual membership fee is required")
    .moreThan(0, "Annual membership fee must be a positive number"),
  singleTrainingPrice: Yup.number()
    .required("Single training price is required")
    .moreThan(0, "Single training price must be a positive number"),
  groupTrainingPrice: Yup.number()
    .required("Group training price is required")
    .moreThan(0, "Group training price must be a positive number"),
  personalTrainingPrice: Yup.number()
    .required("Personal training price is required")
    .moreThan(0, "Personal training price must be a positive number"),
});

const CreateFitnessCenterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.centers
  );

  useEffect(() => {
    if (isError) {
      notifyError(message);
    }

    if (isSuccess) {
      notifySuccess(message);
      navigate("/dashboard");
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
        name: "",
        address: "",
        openingDate: "",
        monthlyMembershipFee: "",
        annualMembershipFee: "",
        singleTrainingPrice: "",
        groupTrainingPrice: "",
        personalTrainingPrice: "",
      }}
      validationSchema={createFitnessCenterSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        dispatch(createCenter(values));
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
                touched.name
                  ? errors.name
                    ? "border-danger"
                    : "border-success"
                  : ""
              }`}
            />
            {errors.name && touched.name ? (
              <div className="error-message">{errors.name}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              placeholder="Enter address"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address}
              className={`border border-2 ${
                touched.address
                  ? errors.address
                    ? "border-danger"
                    : "border-success"
                  : ""
              }`}
            />
            {errors.address && touched.address ? (
              <div className="error-message">{errors.address}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="openingDate">
            <Form.Label>Opened</Form.Label>
            <Form.Control
              type="date"
              name="openingDate"
              placeholder="Enter opening date"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.openingDate}
              className={`border border-2 ${
                touched.openingDate
                  ? errors.openingDate
                    ? "border-danger"
                    : "border-success"
                  : ""
              }`}
            />
            {errors.openingDate && touched.openingDate ? (
              <div className="error-message">{errors.openingDate}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="monthlyMembershipFee">
            <Form.Label>Monthly membership fee</Form.Label>
            <Form.Control
              type="number"
              name="monthlyMembershipFee"
              placeholder="Enter monthly membership fee"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.monthlyMembershipFee}
              className={`border border-2 ${
                touched.monthlyMembershipFee
                  ? errors.monthlyMembershipFee
                    ? "border-danger"
                    : "border-success"
                  : ""
              }`}
            />
            {errors.monthlyMembershipFee && touched.monthlyMembershipFee ? (
              <div className="error-message">{errors.monthlyMembershipFee}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="annualMembershipFee">
            <Form.Label>Annual membership fee</Form.Label>
            <Form.Control
              type="number"
              name="annualMembershipFee"
              placeholder="Enter annual membership fee"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.annualMembershipFee}
              className={`border border-2 ${
                touched.annualMembershipFee
                  ? errors.annualMembershipFee
                    ? "border-danger"
                    : "border-success"
                  : ""
              }`}
            />
            {errors.annualMembershipFee && touched.annualMembershipFee ? (
              <div className="error-message">{errors.annualMembershipFee}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="singleTrainingPrice">
            <Form.Label>Single training price</Form.Label>
            <Form.Control
              type="number"
              name="singleTrainingPrice"
              placeholder="Enter single training price"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.singleTrainingPrice}
              className={`border border-2 ${
                touched.singleTrainingPrice
                  ? errors.singleTrainingPrice
                    ? "border-danger"
                    : "border-success"
                  : ""
              }`}
            />
            {errors.singleTrainingPrice && touched.singleTrainingPrice ? (
              <div className="error-message">{errors.singleTrainingPrice}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="groupTrainingPrice">
            <Form.Label>Group training price</Form.Label>
            <Form.Control
              type="number"
              name="groupTrainingPrice"
              placeholder="Enter group training price"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.groupTrainingPrice}
              className={`border border-2 ${
                touched.groupTrainingPrice
                  ? errors.groupTrainingPrice
                    ? "border-danger"
                    : "border-success"
                  : ""
              }`}
            />
            {errors.groupTrainingPrice && touched.groupTrainingPrice ? (
              <div className="error-message">{errors.groupTrainingPrice}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="personalTrainingPrice">
            <Form.Label>Personal training price</Form.Label>
            <Form.Control
              type="number"
              name="personalTrainingPrice"
              placeholder="Enter personal training price"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.personalTrainingPrice}
              className={`border border-2 ${
                touched.personalTrainingPrice
                  ? errors.personalTrainingPrice
                    ? "border-danger"
                    : "border-success"
                  : ""
              }`}
            />
            {errors.personalTrainingPrice && touched.personalTrainingPrice ? (
              <div className="error-message">
                {errors.personalTrainingPrice}
              </div>
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

export default CreateFitnessCenterForm;
