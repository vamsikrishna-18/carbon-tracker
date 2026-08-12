import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ORGANIZATION_API_BASE_URL = `${API_BASE_URL}/organization`;

// =====================================================
// ORGANIZATION DASHBOARD
// =====================================================

export const getOrganizationDashboard = async () => {
  return axios.get(`${ORGANIZATION_API_BASE_URL}/dashboard`);
};

// =====================================================
// EMPLOYEES
// =====================================================

export const getOrganizationEmployees = async () => {
  return axios.get(`${ORGANIZATION_API_BASE_URL}/employees`);
};

// =====================================================
// CREATE EMPLOYEE
// =====================================================

export const createOrganizationEmployee = async (employeeData) => {
  return axios.post(`${ORGANIZATION_API_BASE_URL}/employees`, employeeData);
};

// =====================================================
// ACTIVITIES
// =====================================================

export const getOrganizationActivities = async () => {
  return axios.get(`${ORGANIZATION_API_BASE_URL}/activities`);
};

// =====================================================
// BADGES
// =====================================================

export const getOrganizationBadges = async () => {
  return axios.get(`${ORGANIZATION_API_BASE_URL}/badges`);
};

// =====================================================
// EMISSION FACTORS
// =====================================================

export const getOrganizationEmissionFactors = async () => {
  return axios.get(`${ORGANIZATION_API_BASE_URL}/emission-factors`);
};

// =====================================================
// ANALYTICS
// =====================================================

export const getOrganizationAnalytics = async () => {
  return axios.get(`${ORGANIZATION_API_BASE_URL}/analytics`);
};

// =====================================================
// LEADERBOARD
// =====================================================

export const getOrganizationLeaderboard = async () => {
  return axios.get(`${ORGANIZATION_API_BASE_URL}/leaderboard`);
};