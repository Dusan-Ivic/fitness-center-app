import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TrainingsTable from "../../components/TrainingsTable";
import "./DashboardPage.css";

const TrainerDashboardPage = () => {
  const { trainings } = useSelector((state) => state.trainings);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <hr />
      <div className="dashboard-group">
        <div className="dashboard-group-header">
          <h3>All Trainings</h3>
          <Link to={`/trainings/create`}>Create new</Link>
        </div>
        <TrainingsTable trainings={trainings} />
      </div>
    </div>
  );
};

export default TrainerDashboardPage;
