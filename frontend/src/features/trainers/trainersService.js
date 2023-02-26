import axios from "axios";

const getEmployedTrainers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get("/api/users", config);

  return res.data;
};

const registerTrainer = async (token, userData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post("/api/users/employ", userData, config);

  return res.data;
};

const trainersService = {
  getEmployedTrainers,
  registerTrainer,
};

export default trainersService;
