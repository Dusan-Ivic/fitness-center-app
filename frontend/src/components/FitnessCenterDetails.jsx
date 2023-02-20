import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import moment from "moment";

const FitnessCenterDetails = ({ center }) => {
  return (
    <Card className="details">
      <ListGroup variant="flush">
        <ListGroup.Item className="details-item">
          <div className="details-item-title">Name</div>
          <div className="details-item-value">{center.name}</div>
        </ListGroup.Item>
        <ListGroup.Item className="details-item">
          <div className="details-item-title">Address</div>
          <div className="details-item-value">{center.address}</div>
        </ListGroup.Item>
        <ListGroup.Item className="details-item">
          <div className="details-item-title">Opened In</div>
          <div className="details-item-value">
            {moment(center.openingYear).year()}
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default FitnessCenterDetails;
