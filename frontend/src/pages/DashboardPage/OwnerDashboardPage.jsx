import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import FitnessCentersTable from "../../components/FitnessCentersTable";
import "./DashboardPage.css";
import Spinner from "react-bootstrap/Spinner";
import { deleteCenter, reset } from "../../features/centers/centersSlice";
import { useNavigate } from "react-router-dom";
import { notifySuccess, notifyError } from "../../utils/notify";
import TrainersTable from "../../components/TrainersTable";

const OwnerDashboardPage = () => {
  const { centers, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.centers
  );

  const trainersState = useSelector((state) => state.trainers);

  const [forDelete, setForDelete] = useState({ name: "", id: "" });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError && message) {
      notifyError(message);
    }

    if (isSuccess && message) {
      notifySuccess(message);
      navigate("/dashboard");
    }

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  const handleDeleteSet = (name, id) => {
    setIsModalVisible(true);
    setForDelete({ name, id });
  };

  const handleDeleteCancel = () => {
    setIsModalVisible(false);
    setForDelete({ name: "", id: "" });
  };

  const handleDeleteConfirm = () => {
    setIsModalVisible(false);
    dispatch(deleteCenter(forDelete.id));
  };

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <hr />
      <div className="dashboard-group">
        <div className="dashboard-group-header">
          <h3>Owned Fitness Centers</h3>
          <Link to={`/centers/create`}>Create new</Link>
        </div>
        <FitnessCentersTable
          centers={centers}
          handleDeleteSet={handleDeleteSet}
        />
      </div>
      <hr />
      <div className="dashboard-group">
        <div className="dashboard-group-header">
          <h3>Employed Trainers</h3>
          <Link to={`/register/trainer`}>Register new</Link>
        </div>
        <TrainersTable trainers={trainersState.trainers} />
      </div>
      <ConfirmDeleteModal
        isModalVisible={isModalVisible}
        forDelete={forDelete}
        handleDeleteCancel={handleDeleteCancel}
        handleDeleteConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default OwnerDashboardPage;
