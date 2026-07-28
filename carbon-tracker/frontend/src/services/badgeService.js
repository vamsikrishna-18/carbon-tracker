import axios from "axios";

const API = "http://localhost:8080/api/badges";

export const getUserBadges = (userId) => {
  return axios.get(
    `http://localhost:8080/api/badges/${userId}`
  );
};