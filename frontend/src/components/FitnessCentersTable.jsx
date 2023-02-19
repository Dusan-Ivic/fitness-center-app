import React from "react";
import Table from "react-bootstrap/Table";
import moment from "moment";

const FitnessCentersTable = ({ centers }) => {
  return (
    <>
      {centers && centers.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Opened In</th>
            </tr>
          </thead>
          <tbody>
            {centers &&
              centers.map((center) => (
                <tr key={center._id}>
                  <td>{center.name}</td>
                  <td>{center.address}</td>
                  <td>{moment(center.openingYear).year()}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <p>No Fitness Centers Found</p>
      )}
    </>
  );
};

export default FitnessCentersTable;
