import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const USER_API_BASE_URL = `${API_BASE_URL}/user`;

// =====================================================
// LOGIN
// =====================================================

export const loginUser = async (loginData) => {
  return axios.post(`${USER_API_BASE_URL}/login`, loginData);
};

// =====================================================
// CHANGE PASSWORD
// =====================================================

export const changePassword = async (userId, passwordData) => {
  return axios.post(`${USER_API_BASE_URL}/change-password/${userId}`, passwordData);
};

// =====================================================
// FORGOT PASSWORD
// =====================================================

export const forgotPassword = async (email) => {
  return axios.post(`${USER_API_BASE_URL}/forgot-password`, { email });
};

// =====================================================
// VERIFY OTP
// =====================================================

export const verifyOtp = async (data) => {
  return axios.post(`${USER_API_BASE_URL}/verify-otp`, data);
};

// =====================================================
// RESET PASSWORD
// =====================================================

export const resetPassword = async (data) => {
  return axios.post(`${USER_API_BASE_URL}/reset-password`, data);
};

// =====================================================
// UPDATE PROFILE
// =====================================================

export const updateProfile = async (userId, data) => {
  return axios.put(`${USER_API_BASE_URL}/update/${userId}`, data);
};