import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/admin",
});

export const getDashboard = () => API.get("/dashboard");

export const getUsers = () => API.get("/users");

export const makeAdmin = (id) =>
  API.put(`/make-admin/${id}`);

export const removeAdmin = (id) =>
  API.put(`/remove-admin/${id}`);

export const deleteUser = (id) =>
  API.delete(`/delete-user/${id}`);
export const getAdminAnalytics = () =>
  API.get("/analytics");
export const getAnalyticsDetails = (filter) =>
  API.get(`/analytics-details?filter=${filter}`);
export const getAllActivities = () =>
  API.get("/activities");