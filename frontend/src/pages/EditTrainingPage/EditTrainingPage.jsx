import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EditTrainingForm from "../../components/EditTrainingForm";

const EditTrainingPage = () => {
  const { id } = useParams();
  const { trainings } = useSelector((state) => state.trainings);
  const [trainingData, setTrainingData] = useState(null);

  useEffect(() => {
    const training = trainings.find((t) => t._id === id);
    if (training) {
      setTrainingData(training);
    }
  }, [id, trainings]);

  return trainingData ? (
    <div className="mb-5">
      <h1>Edit Training</h1>
      <EditTrainingForm training={trainingData} />
    </div>
  ) : null;
};

export default EditTrainingPage;
