import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API = `${API_BASE_URL}/chat`;

export const sendMessage = async (message) => {
  try {
    const response = await axios.post(
      API,
      {
        message: message
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Gemini Response:", response.data);

    return response.data;

  } catch (error) {
    console.error(
      "Chat API Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};