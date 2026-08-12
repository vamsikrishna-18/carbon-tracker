import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API = `${API_BASE_URL}/goals`;

// Create Goal
export const createGoal = (goal) => {
  return axios.post(`${API}/create`, goal);
};

// Get all goals for a user
export const getGoal = (userId) => {
  return axios.get(`${API}/user/${userId}`);
};

// Get all goals - clearer alias
export const getGoals = (userId) => {
  return axios.get(`${API}/user/${userId}`);
};

// Get individual goal progress
export const getGoalProgress = (goalId) => {
  return axios.get(`${API}/progress/${goalId}`);
};

// Update goal
export const updateGoal = (goalId, goal) => {
  return axios.put(`${API}/update/${goalId}`, goal);
};