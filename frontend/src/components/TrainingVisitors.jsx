import React from "react";
import Table from "react-bootstrap/Table";

const TrainingVisitors = ({ visitors }) => {
  return (
    <>
      {visitors && visitors.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Username</th>
              <th>First name</th>
              <th>Last name</th>
            </tr>
          </thead>
          <tbody>
            {visitors &&
              visitors.map((visitor) => (
                <tr key={visitor._id}>
                  <td>{visitor.username}</td>
                  <td>{visitor.firstName}</td>
                  <td>{visitor.lastName}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <p>No Visitors Found</p>
      )}
    </>
  );
};

export default TrainingVisitors;
