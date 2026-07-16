import axios from "axios";
const API_URL = "https://api-blog-af3u.onrender.com/api/posts";
// API get posts, create post, delete post

export const getPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createPost = async (post) => {
  const response = await axios.post(API_URL, post);
  return response.data;
};
export const deletePost = async (postId) => {
  const response = await axios.delete(`${API_URL}/${postId}`);
  return response.data;
};
