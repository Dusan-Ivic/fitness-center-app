import axios from "axios";

const getOwnedCenters = async (id) => {
  const res = await axios.get(`/api/centers?owner=${id}`);

  return res.data;
};

const centersService = {
  getOwnedCenters,
};

export default centersService;
