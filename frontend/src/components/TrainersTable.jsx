import React from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import "../styles/Table.css";

const TrainersTable = ({ trainers, handleDeleteSet }) => {
  return (
    <>
      {trainers && trainers.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Username</th>
              <th>Full name</th>
              <th>Employed in</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {trainers &&
              trainers.map((trainer) => (
                <tr key={trainer._id}>
                  <td>{trainer.username}</td>
                  <td>{`${trainer.firstName} ${trainer.lastName}`}</td>
                  <td>{trainer.center.name}</td>
                  <td>
                    <Link
                      to=""
                      onClick={() =>
                        handleDeleteSet(
                          "trainer",
                          trainer.username,
                          trainer._id
                        )
                      }
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <p>No Trainers Found</p>
      )}
    </>
  );
};

export default TrainersTable;
