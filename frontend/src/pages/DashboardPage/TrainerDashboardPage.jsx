import React from "react";
import { useSelector } from "react-redux";
import TrainingsTable from "../../components/TrainingsTable";

const TrainerDashboardPage = () => {
  const { trainings } = useSelector((state) => state.trainings);

  return (
    <div>
      <h1>Dashboard</h1>
      <hr />
      <div>
        <h3>All Trainings</h3>
        <TrainingsTable trainings={trainings} />
      </div>
    </div>
  );
};

export default TrainerDashboardPage;
