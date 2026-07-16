import axios from "axios";

const API = "https://api-blog-af3u.onrender.com/api";

export const loginUser = (email, password) => {
  return axios.post(`${API}/auth/login`, { email, password });
};

export const registerUser = (email, username, password) => {
  return axios.post(`${API}/auth/register`, { email, username, password });
};