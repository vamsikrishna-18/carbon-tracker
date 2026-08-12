import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API = axios.create({
  baseURL: `${API_BASE_URL}/admin`,
});

// =====================================================
// DASHBOARD
// =====================================================

export const getDashboard = () => API.get("/dashboard");

// =====================================================
// USERS
// =====================================================

export const getUsers = () => API.get("/users");

export const makeAdmin = (id) => API.put(`/make-admin/${id}`);

export const removeAdmin = (id) => API.put(`/remove-admin/${id}`);

export const deleteUser = (id) => API.delete(`/delete-user/${id}`);

// =====================================================
// ANALYTICS
// =====================================================

export const getAdminAnalytics = () => API.get("/analytics");

export const getAnalyticsDetails = (filter) =>
  API.get(`/analytics-details?filter=${filter}`);

// =====================================================
// ACTIVITIES
// =====================================================

export const getAllActivities = () => API.get("/activities");

// =====================================================
// ANNOUNCEMENTS
// =====================================================

export const getAnnouncements = () => API.get("/announcements");

export const createAnnouncement = (announcement) =>
  API.post("/announcements", announcement);

export const updateAnnouncement = (id, announcement) =>
  API.put(`/announcements/${id}`, announcement);

export const deleteAnnouncement = (id) => API.delete(`/announcements/${id}`);