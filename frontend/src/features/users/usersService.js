import axios from "axios";

const registerVisitor = async (userData) => {
  const res = await axios.post("/api/users", userData);

  return res.data;
};

const usersService = {
  registerVisitor,
};

export default usersService;
