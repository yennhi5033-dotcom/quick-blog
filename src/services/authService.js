import axios from "axios";

const API = "https://api-blog-af3u.onrender.com/api";

const authClient = axios.create({
  baseURL: API,
});

export const loginUser = async (email, password) => {
  const response = await authClient.post("/auth/login", { email, password });
  return response.data;
};

export const registerUser = async (email, username, password) => {
  const response = await authClient.post("/auth/register", {
    email,
    username,
    password,
  });
  return response.data;
};

export const getMe = async (token) => {
  const response = await authClient.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getUsers = async (token) => {
  const response = await authClient.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteUser = async (token, userId) => {
  const response = await authClient.delete(`/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
