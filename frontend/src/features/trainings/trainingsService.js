import axios from "axios";

const getCreatedTrainings = async (id) => {
  const res = await axios.get(`/api/trainings?trainer=${id}`);

  return res.data;
};

const trainingsService = {
  getCreatedTrainings,
};

export default trainingsService;
