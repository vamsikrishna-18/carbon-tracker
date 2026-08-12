import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const userApi = axios.create({
  baseURL: `${API_BASE_URL}/user`,
  headers: {
    "Content-Type": "application/json",
  },
});

const adminApi = axios.create({
  baseURL: `${API_BASE_URL}/admin`,
  headers: {
    "Content-Type": "application/json",
  },
});
const API = `${API_BASE_URL}/activity`;

export const getDashboardData = (userId) =>
  axios.get(`${API}/dashboard/${userId}`);

// USER

export const registerUser = (data) =>
  userApi.post("/register", data);

export const loginUser = (data) =>
  userApi.post("/login", data);

// ADMIN

export const registerAdmin = (data) =>
  adminApi.post("/register", data);

export const loginAdmin = (data) =>
  adminApi.post("/login", data);

// PASSWORD

export const forgotPassword = (data) =>
  userApi.post("/forgot-password", data);

export const verifyOtp = (data) =>
  userApi.post("/verify-otp", data);

export const resetPassword = (data) =>
  userApi.post("/reset-password", data);