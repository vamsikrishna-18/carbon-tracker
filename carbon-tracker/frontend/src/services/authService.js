import axios from "axios";

const userApi = axios.create({
  baseURL: "http://localhost:8080/api/user",
  headers: {
    "Content-Type": "application/json",
  },
});

const adminApi = axios.create({
  baseURL: "http://localhost:8080/api/admin",
  headers: {
    "Content-Type": "application/json",
  },
});
const API = "http://localhost:8080/api/activity";

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