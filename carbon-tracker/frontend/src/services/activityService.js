import axios from "axios";

const API = "http://localhost:8080/api/activity";

export const getDashboardData = (userId) => {
  return axios.get(`${API}/dashboard/${userId}`);
};

export const getActivities = (userId) => {
  return axios.get(`${API}/${userId}`);
};
export const getAnalytics = (userId, filter) =>
  axios.get(`${API}/analytics/${userId}?filter=${filter}`);
export const getWeeklyTrend = (userId) => {
  return axios.get(`${API}/weekly-trend/${userId}`);
};