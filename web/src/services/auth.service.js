import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {username, email, password});
};

const login = async (username, password) => {
  return await axios.post(API_URL + "signin", {username, password})
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = async () => {
  localStorage.removeItem("user");
  return await axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;
