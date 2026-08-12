import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API = `${API_BASE_URL}/activity`;

export const getDashboardData = (userId) => {
  return axios.get(`${API}/dashboard/${userId}`);
};

export const getActivities = (userId) => {
  return axios.get(`${API}/${userId}`);
};

export const getAnalytics = (userId, filter) => {
  return axios.get(`${API}/analytics/${userId}?filter=${filter}`);
};

export const getWeeklyTrend = (userId) => {
  return axios.get(`${API}/weekly-trend/${userId}`);
};