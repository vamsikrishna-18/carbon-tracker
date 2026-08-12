import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/user`;

// =====================================================
// LOGIN
// =====================================================

export const loginUser = async (loginData) => {
  return axios.post(
    `${API_BASE_URL}/login`,
    loginData
  );
};


// =====================================================
// CHANGE PASSWORD
// =====================================================

export const changePassword = async (
  userId,
  passwordData
) => {
  return axios.post(
    `${API_BASE_URL}/change-password/${userId}`,
    passwordData
  );
};


// =====================================================
// FORGOT PASSWORD
// =====================================================

export const forgotPassword = async (email) => {
  return axios.post(
    `${API_BASE_URL}/forgot-password`,
    {
      email,
    }
  );
};


// =====================================================
// VERIFY OTP
// =====================================================

export const verifyOtp = async (data) => {
  return axios.post(
    `${API_BASE_URL}/verify-otp`,
    data
  );
};


// =====================================================
// RESET PASSWORD
// =====================================================

export const resetPassword = async (data) => {
  return axios.post(
    `${API_BASE_URL}/reset-password`,
    data
  );
};


// =====================================================
// UPDATE PROFILE
// =====================================================

export const updateProfile = async (
  userId,
  data
) => {
  return axios.put(
    `${API_BASE_URL}/update/${userId}`,
    data
  );
};