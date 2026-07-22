import axios from "axios";

const API = "https://api-blog-af3u.onrender.com/api";

const authClient = axios.create({
  baseURL: API,
});

const normalizeToken = (token) => {
  if (!token) return "";

  if (typeof token === "string") {
    const trimmed = token.trim();

    try {
      const parsed = JSON.parse(trimmed);
      if (typeof parsed === "string") return parsed;
      return (
        parsed?.accessToken ||
        parsed?.token ||
        parsed?.access_token ||
        trimmed
      );
    } catch {
      return trimmed;
    }
  }

  if (typeof token === "object") {
    return token?.accessToken || token?.token || token?.access_token || "";
  }

  return "";
};

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
  const authToken = normalizeToken(token);
  const response = await authClient.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};

export const getUsers = async (token) => {
  const authToken = normalizeToken(token);
  const response = await authClient.get("/users", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};

export const deleteUser = async (token, userId) => {
  const authToken = normalizeToken(token);
  const response = await authClient.delete(`/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};

export const updateUserRole = async (token, userId, role) => {
  const authToken = normalizeToken(token);
  const response = await authClient.put(
    `/users/${userId}/role`,
    { role },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );
  return response.data;
};
