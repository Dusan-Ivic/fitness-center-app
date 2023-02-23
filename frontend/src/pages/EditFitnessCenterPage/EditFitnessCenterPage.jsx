import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EditFitnessCenterForm from "../../components/EditFitnessCenterForm";

const EditFitnessCenterPage = () => {
  const { id } = useParams();
  const { centers } = useSelector((state) => state.centers);
  const [fitnessCenter, setFitnessCenter] = useState(null);

  useEffect(() => {
    const center = centers.find((c) => c._id === id);
    if (center) {
      setFitnessCenter(center);
    }
  }, [id, centers]);

  return fitnessCenter ? (
    <div className="mb-5">
      <h1>Edit Fitness Center</h1>
      <EditFitnessCenterForm center={fitnessCenter} />
    </div>
  ) : null;
};

export default EditFitnessCenterPage;
