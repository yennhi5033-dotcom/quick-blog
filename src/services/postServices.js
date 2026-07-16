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
    if (!res) throw new Error("Failed to fetch post");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
