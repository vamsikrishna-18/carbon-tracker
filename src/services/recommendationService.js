import axios from "axios";

const API = `${import.meta.env.VITE_BACKEND_URL}/api/recommendations`;

export const getRecommendations = (userId) => {
  return axios.get(`${API}/${userId}`);
};