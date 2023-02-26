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

const trainersService = {
  getEmployedTrainers,
};

export default trainersService;
