import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/admin`,
});


// =====================================================
// DASHBOARD
// =====================================================

export const getDashboard = () =>
  API.get("/dashboard");


// =====================================================
// USERS
// =====================================================

export const getUsers = () =>
  API.get("/users");

export const makeAdmin = (id) =>
  API.put(`/make-admin/${id}`);

export const removeAdmin = (id) =>
  API.put(`/remove-admin/${id}`);

export const deleteUser = (id) =>
  API.delete(`/delete-user/${id}`);


// =====================================================
// ANALYTICS
// =====================================================

export const getAdminAnalytics = () =>
  API.get("/analytics");

export const getAnalyticsDetails = (filter) =>
  API.get(`/analytics-details?filter=${filter}`);


// =====================================================
// ACTIVITIES
// =====================================================

export const getAllActivities = () =>
  API.get("/activities");


// =====================================================
// ANNOUNCEMENTS
// =====================================================

export const getAnnouncements = () =>
  API.get("/announcements");

export const createAnnouncement = (announcement) =>
  API.post("/announcements", announcement);

export const updateAnnouncement = (
  id,
  announcement
) =>
  API.put(
    `/announcements/${id}`,
    announcement
  );

export const deleteAnnouncement = (id) =>
  API.delete(
    `/announcements/${id}`
  );