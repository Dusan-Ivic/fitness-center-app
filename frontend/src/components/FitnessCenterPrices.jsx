import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const FitnessCenterPrices = ({ center }) => {
  return (
    <Card className="details">
      <ListGroup variant="flush">
        <ListGroup.Item className="details-item">
          <div className="details-item-title">Monthly membership fee</div>
          <div className="details-item-value">
            ${center.monthlyMembershipFee["$numberDecimal"]}
          </div>
        </ListGroup.Item>
        <ListGroup.Item className="details-item">
          <div className="details-item-title">Annual membership fee</div>
          <div className="details-item-value">
            ${center.annualMembershipFee["$numberDecimal"]}
          </div>
        </ListGroup.Item>
        <ListGroup.Item className="details-item">
          <div className="details-item-title">Single training price</div>
          <div className="details-item-value">
            ${center.singleTrainingPrice["$numberDecimal"]}
          </div>
        </ListGroup.Item>
        <ListGroup.Item className="details-item">
          <div className="details-item-title">Group training price</div>
          <div className="details-item-value">
            ${center.groupTrainingPrice["$numberDecimal"]}
          </div>
        </ListGroup.Item>
        <ListGroup.Item className="details-item">
          <div className="details-item-title">Personal training price</div>
          <div className="details-item-value">
            ${center.personalTrainingPrice["$numberDecimal"]}
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default FitnessCenterPrices;
