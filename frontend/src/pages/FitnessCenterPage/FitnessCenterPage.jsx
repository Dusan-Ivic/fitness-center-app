import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FitnessCenterDetails from "../../components/FitnessCenterDetails";
import FitnessCenterPrices from "../../components/FitnessCenterPrices";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

const FitnessCenterPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [fitnessCenter, setFitnessCenter] = useState({
    name: "",
    address: "",
    openingYear: new Date(),
    owner: "",
    monthlyMembershipFee: 0,
    annualMembershipFee: 0,
    singleTrainingPrice: 0,
    groupTrainingPrice: 0,
    personalTrainingPrice: 0,
  });

  useEffect(() => {
    getFitnessCenter(id);
  }, [id]);

  const getFitnessCenter = async (id) => {
    setIsLoading(true);
    const res = await axios.get(`/api/centers?_id=${id}`);
    if (res.data.count > 0) {
      setFitnessCenter(res.data.data[0]);
    } else {
      setFitnessCenter(null);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

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
