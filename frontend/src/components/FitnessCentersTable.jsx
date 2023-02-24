import React from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import moment from "moment";
import "../styles/Table.css";

const FitnessCentersTable = ({ centers, handleDeleteSet }) => {
  return (
    <>
      {centers && centers.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Opened</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {centers &&
              centers.map((center) => (
                <tr key={center._id}>
                  <td>{center.name}</td>
                  <td>{center.address}</td>
                  <td>{moment(center.openingDate).format("LL")}</td>
                  <td>
                    <Link to={`/centers/${center._id}`}>Details</Link>
                  </td>
                  <td>
                    <Link to={`/centers/${center._id}/edit`}>Edit</Link>
                  </td>
                  <td>
                    <Link
                      to=""
                      onClick={() => handleDeleteSet(center.name, center._id)}
                    >
                      Delete
                    </Link>
                  </td>
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
