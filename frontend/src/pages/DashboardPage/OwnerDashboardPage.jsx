import React from "react";
import { useSelector } from "react-redux";
import FitnessCentersTable from "../../components/FitnessCentersTable";

const OwnerDashboardPage = () => {
  const { centers } = useSelector((state) => state.centers);

  return (
    <div>
      <h1>Dashboard</h1>
      <hr />
      <div>
        <h3>Owned Fitness Centers</h3>
        <FitnessCentersTable centers={centers} />
      </div>
    </div>
  );
};

export default OwnerDashboardPage;
