import axios from "axios";

const API = `${import.meta.env.VITE_BACKEND_URL}/api/badges`;

export const getUserBadges = (userId) => {
  return axios.get(`${API}/${userId}`);
};