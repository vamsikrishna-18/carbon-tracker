import axios from "axios";

const API = `${import.meta.env.VITE_BACKEND_URL}/api/notifications`;

// ============================================================
// GET ALL NOTIFICATIONS
// ============================================================

export const getNotifications = async (userId) => {
  const response = await axios.get(`${API}/${userId}`);
  return response.data;
};


// ============================================================
// GET UNREAD COUNT
// ============================================================

export const getUnreadCount = async (userId) => {
  const response = await axios.get(`${API}/unread/${userId}`);
  return response.data;
};


// ============================================================
// MARK ONE NOTIFICATION AS READ
// ============================================================

export const markAsRead = async (notificationId) => {
  const response = await axios.put(
    `${API}/read/${notificationId}`
  );

  return response.data;
};


// ============================================================
// MARK ALL NOTIFICATIONS AS READ
// ============================================================

export const markAllAsRead = async (userId) => {
  const response = await axios.put(
    `${API}/read-all/${userId}`
  );

  return response.data;
};


// ============================================================
// ALIASES
// ============================================================
// These keep compatibility with the names used in the navbar.
// ============================================================

export const markNotificationAsRead = markAsRead;

export const markAllNotificationsAsRead = markAllAsRead;