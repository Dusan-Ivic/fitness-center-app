import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import FitnessCenterDetails from "../../components/FitnessCenterDetails";
import FitnessCenterPrices from "../../components/FitnessCenterPrices";

const FitnessCenterPage = () => {
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
      <h1>{fitnessCenter.name}</h1>
      <hr />
      <div>
        <h3>Details</h3>
        <FitnessCenterDetails center={fitnessCenter} />
      </div>
      <br />
      <div>
        <h3>Prices</h3>
        <FitnessCenterPrices center={fitnessCenter} />
      </div>
    </div>
  ) : null;
};

export default FitnessCenterPage;
