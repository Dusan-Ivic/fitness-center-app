import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import FitnessCentersTable from "../../components/FitnessCentersTable";
import "./DashboardPage.css";

const OwnerDashboardPage = () => {
  const { centers } = useSelector((state) => state.centers);
  const [forDelete, setForDelete] = useState({ name: "", id: "" });
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    // TODO - Dispatch delete action
    console.log(`DELETE /api/centers/${forDelete.id}`);
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <hr />
      <div className="dashboard-centers">
        <div className="dashboard-centers-header">
          <h3>Owned Fitness Centers</h3>
          <Link to={`/centers/create`}>Create new</Link>
        </div>
        <FitnessCentersTable
          centers={centers}
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
