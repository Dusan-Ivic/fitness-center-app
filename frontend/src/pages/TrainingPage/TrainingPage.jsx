import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import TrainingDetails from "../../components/TrainingDetails";

const TrainingPage = () => {
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
      <h1>{trainingData.name}</h1>
      <hr />
      <div>
        <h3>Details</h3>
        <TrainingDetails training={trainingData} />
      </div>
    </div>
  ) : null;
};

export default TrainingPage;
