import axios from "axios";

const registerVisitor = async (userData) => {
  const res = await axios.post("/api/users", userData);

  return res.data;
};

const loginUser = async (userData) => {
  const res = await axios.post("/api/users/login", userData);

  return res.data;
};

const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const usersService = {
  registerVisitor,
  loginUser,
  logoutUser,
};

export default usersService;
