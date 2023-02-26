import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import FitnessCentersTable from "../../components/FitnessCentersTable";
import TrainersTable from "../../components/TrainersTable";
import "./DashboardPage.css";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { notifySuccess, notifyError } from "../../utils/notify";
import {
  deleteCenter,
  centersSlice,
} from "../../features/centers/centersSlice";
import {
  deleteTrainer,
  trainersSlice,
} from "../../features/trainers/trainersSlice";

const OwnerDashboardPage = () => {
  const centersState = useSelector((state) => state.centers);
  const trainersState = useSelector((state) => state.trainers);

  const [forDelete, setForDelete] = useState({ type: "", name: "", id: "" });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (centersState.isError && centersState.message) {
      notifyError(centersState.message);
    }

    if (centersState.isSuccess && centersState.message) {
      notifySuccess(centersState.message);
      navigate("/dashboard");
    }

    if (trainersState.isError && trainersState.message) {
      notifyError(trainersState.message);
    }

    if (trainersState.isSuccess && trainersState.message) {
      notifySuccess(trainersState.message);
      navigate("/dashboard");
    }

    dispatch(centersSlice.actions.reset());
    dispatch(trainersSlice.actions.reset());
  }, [centersState, trainersState, navigate, dispatch]);

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
      case "center":
        dispatch(deleteCenter(forDelete.id));
        break;
      case "trainer":
        dispatch(deleteTrainer(forDelete.id));
        break;
      default:
        break;
    }
  };

  if (centersState.isLoading || trainersState.isLoading) {
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
          centers={centersState.centers}
          handleDeleteSet={handleDeleteSet}
        />
      </div>
      <hr />
      <div className="dashboard-group">
        <div className="dashboard-group-header">
          <h3>Employed Trainers</h3>
          <Link to={`/register/trainer`}>Register new</Link>
        </div>
        <TrainersTable
          trainers={trainersState.trainers}
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

export default OwnerDashboardPage;
