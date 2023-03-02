import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import moment from "moment";

const TrainingDetails = ({ training }) => {
  return (
    <Card className="details">
      <ListGroup variant="flush">
        <ListGroup.Item className="details-item">
          <div className="details-item-title">Name</div>
          <div className="details-item-value">{training.name}</div>
        </ListGroup.Item>
        <ListGroup.Item className="details-item">
          <div className="details-item-title">Type</div>
          <div className="details-item-value">{training.type}</div>
        </ListGroup.Item>
        <ListGroup.Item className="details-item">
          <div className="details-item-title">Starting</div>
          <div className="details-item-value">
            {moment(training.startingTime).format("LLL")}
          </div>
        </ListGroup.Item>
        <ListGroup.Item className="details-item">
          <div className="details-item-title">Location</div>
          <div className="details-item-value">{training.location.name}</div>
        </ListGroup.Item>
        <ListGroup.Item className="details-item">
          <div className="details-item-title">Trainer</div>
          <div className="details-item-value">{`${training.trainer.firstName} ${training.trainer.lastName}`}</div>
        </ListGroup.Item>
        <ListGroup.Item className="details-item">
          <div className="details-item-title">Duration</div>
          <div className="details-item-value">{training.duration}</div>
        </ListGroup.Item>
        <ListGroup.Item className="details-item">
          <div className="details-item-title">Capacity</div>
          <div className="details-item-value">{training.maxVisitors}</div>
        </ListGroup.Item>
        <ListGroup.Item className="details-item">
          <div className="details-item-title">Visitors</div>
          <div className="details-item-value">{training.visitors.length}</div>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default TrainingDetails;
