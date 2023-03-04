import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import TrainingsTable from "../../components/TrainingsTable";
import "./DashboardPage.css";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { notifySuccess, notifyError } from "../../utils/notify";
import {
  deleteTraining,
  trainingsSlice,
} from "../../features/trainings/trainingsSlice";

const TrainerDashboardPage = () => {
  const trainingsState = useSelector((state) => state.trainings);

  const [forDelete, setForDelete] = useState({ type: "", name: "", id: "" });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (trainingsState.isError && trainingsState.message) {
      notifyError(trainingsState.message);
    }

    if (trainingsState.isSuccess && trainingsState.message) {
      notifySuccess(trainingsState.message);
      navigate("/dashboard");
    }

    dispatch(trainingsSlice.actions.reset());
  }, [trainingsState, navigate, dispatch]);

  const handleDeleteSet = (type, name, id) => {
    setIsModalVisible(true);
    setForDelete({ type, name, id });
  };

  const handleDeleteCancel = () => {
    setIsModalVisible(false);
    setForDelete({ type: "", name: "", id: "" });
  };

  const handleDeleteConfirm = () => {
    setIsModalVisible(false);
    switch (forDelete.type) {
      case "training":
        dispatch(deleteTraining(forDelete.id));
        break;
      default:
        break;
    }
  };

  if (trainingsState.isLoading) {
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
          <h3>All Trainings</h3>
          <Link to={`/trainings/create`}>Create new</Link>
        </div>
        <TrainingsTable
          trainings={trainingsState.trainings}
          handleDeleteSet={handleDeleteSet}
        />
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

export default TrainerDashboardPage;
