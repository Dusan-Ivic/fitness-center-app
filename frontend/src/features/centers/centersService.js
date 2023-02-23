import axios from "axios";

const getOwnedCenters = async (id) => {
  const res = await axios.get(`/api/centers?owner=${id}`);

  return res.data;
};

const createCenter = async (centerData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post("/api/centers", centerData, config);

  return res.data;
};

const updateCenter = async (id, centerData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.put(`/api/centers/${id}`, centerData, config);

  return res.data;
};

const centersService = {
  getOwnedCenters,
  createCenter,
  updateCenter,
};

export default centersService;
