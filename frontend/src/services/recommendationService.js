import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API = `${API_BASE_URL}/recommendations`;

export const getRecommendations = (userId) => {
  return axios.get(`${API}/${userId}`);
};