import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FitnessCentersTable from "../../components/FitnessCentersTable";
import "./DashboardPage.css";

const OwnerDashboardPage = () => {
  const { centers } = useSelector((state) => state.centers);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <hr />
      <div className="dashboard-centers">
        <div className="dashboard-centers-header">
          <h3>Owned Fitness Centers</h3>
          <Link to={`/centers/create`}>Create new</Link>
        </div>
        <FitnessCentersTable centers={centers} />
      </div>
    </div>
  );
};

export default OwnerDashboardPage;
