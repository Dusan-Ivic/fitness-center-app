import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./ProfilePage.css";
import { useSelector } from "react-redux";
import moment from "moment";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.users);

  return (
    <div>
      <h1>Profile</h1>

      <Card className="details">
        <ListGroup variant="flush">
          <ListGroup.Item className="details-item">
            <div className="details-item-title">Email</div>
            <div className="details-item-value">{user.email}</div>
          </ListGroup.Item>
          <ListGroup.Item className="details-item">
            <div className="details-item-title">Username</div>
            <div className="details-item-value">{user.username}</div>
          </ListGroup.Item>
          <ListGroup.Item className="details-item">
            <div className="details-item-title">First name</div>
            <div className="details-item-value">{user.firstName}</div>
          </ListGroup.Item>
          <ListGroup.Item className="details-item">
            <div className="details-item-title">Last name</div>
            <div className="details-item-value">{user.lastName}</div>
          </ListGroup.Item>
          <ListGroup.Item className="details-item">
            <div className="details-item-title">Gender</div>
            <div className="details-item-value">{user.gender}</div>
          </ListGroup.Item>
          <ListGroup.Item className="details-item">
            <div className="details-item-title">Birthdate</div>
            <div className="details-item-value">
              {moment(user.birthdate).format("LL")}
            </div>
          </ListGroup.Item>
          <ListGroup.Item className="details-item">
            <div className="details-item-title">Role</div>
            <div className="details-item-value">{user.role}</div>
          </ListGroup.Item>
        </ListGroup>
      </Card>
      <Link as={Button} className="btn btn-warning mt-2" to="/profile/edit">
        Edit Profile
      </Link>
    </div>
  );
};

export default ProfilePage;
