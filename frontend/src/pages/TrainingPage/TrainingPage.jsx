import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import TrainingDetails from "../../components/TrainingDetails";
import TrainingVisitors from "../../components/TrainingVisitors";

const TrainingPage = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.users);
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
      {user && user.role === "trainer" ? (
        <>
          <hr />
          <div>
            <h3>Visitors</h3>
            <TrainingVisitors visitors={trainingData.visitors} />
          </div>
        </>
      ) : null}
    </div>
  ) : null;
};

export default TrainingPage;
