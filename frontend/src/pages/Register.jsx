import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Register = () => {
  return (
    <div className="mb-5">
      <h1>Register</h1>
      <Form>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First name</Form.Label>
          <Form.Control type="text" placeholder="Enter first name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control type="text" placeholder="Enter last name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Control type="text" placeholder="Enter gender" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="birthdate">
          <Form.Label>Birthdate</Form.Label>
          <Form.Control type="date" placeholder="Enter birthdate" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
