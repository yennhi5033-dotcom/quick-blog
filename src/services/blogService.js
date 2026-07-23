import axios from "axios";
const API_URL = "https://api-blog-af3u.onrender.com/api/posts";
// API get posts, create post, delete post

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

const getStoredToken = () => {
  try {
    return normalizeToken(localStorage.getItem("token"));
  } catch {
    return "";
  }
};

export const getPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createPost = async (post, token = getStoredToken()) => {
  const response = await axios.post(API_URL, post, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : undefined,
  });
  return response.data;
};
export const deletePost = async (postId) => {
  const response = await axios.delete(`${API_URL}/${postId}`);
  return response.data;
};
