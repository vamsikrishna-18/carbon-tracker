import axios from "axios";

const API = "http://localhost:8080/api/recommendations";

export const getRecommendations = (userId) => {
  return axios.get(`${API}/${userId}`);
};