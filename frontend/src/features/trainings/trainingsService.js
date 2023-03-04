import axios from "axios";

const getCreatedTrainings = async (id) => {
  const res = await axios.get(`/api/trainings?trainer=${id}`);

  return res.data;
};

const createTraining = async (trainingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post("/api/trainings", trainingData, config);

  return res.data;
};

const updateTraining = async (id, trainingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.put(`/api/trainings/${id}`, trainingData, config);

  return res.data;
};

const trainingsService = {
  getCreatedTrainings,
  createTraining,
  updateTraining,
};

export default trainingsService;
