import React from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import moment from "moment";
import "../styles/Table.css";

const TrainingsTable = ({ trainings }) => {
  return (
    <>
      {trainings && trainings.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Starting</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {trainings &&
              trainings.map((training) => (
                <tr key={training._id}>
                  <td>{training.name}</td>
                  <td>{training.type}</td>
                  <td>{moment(training.startingTime).format("LLL")}</td>
                  <td>
                    <Link to={`/trainings/${training._id}`}>Details</Link>
                  </td>
                  <td>
                    <Link to={`/trainings/${training._id}/edit`}>Edit</Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <p>No Trainings Found</p>
      )}
    </>
  );
};

export default TrainingsTable;
