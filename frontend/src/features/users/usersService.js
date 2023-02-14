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

const updateUser = async (id, userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.put(`/api/users/${id}`, userData, config);

  return res.data;
};

const usersService = {
  registerVisitor,
  loginUser,
  logoutUser,
  updateUser,
};

export default usersService;
