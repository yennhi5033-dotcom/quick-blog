import axios from "axios";
const API_URL = "https://api-blog-af3u.onrender.com/api/posts";

export const getPosts = async () => {
  try {
    const res = await axios.get(`${API_URL}`);
    if (!res) throw new Error("Failed to fetch posts");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getPostById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const createPost = async (post) => {
  const response = await axios.post(API_URL, post);
  return response.data;
};
export const deletePost = async (postId) => {
  const response = await axios.delete(`${API_URL}/${postId}`);
  return response.data;
};
