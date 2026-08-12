import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API = `${API_BASE_URL}/badges`;

export const getUserBadges = (userId) => {
  return axios.get(`${API}/${userId}`);
};