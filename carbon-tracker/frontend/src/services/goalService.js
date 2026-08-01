import axios from "axios";

const API = "http://localhost:8080/api/goals";

export const createGoal = (goal) => {
  return axios.post(API, goal);
};

export const getGoal = (userId) => {
  return axios.get(`${API}/${userId}`);
};