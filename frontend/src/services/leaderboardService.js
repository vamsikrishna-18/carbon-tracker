const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API = `${API_BASE_URL}/leaderboard`;

export const getLeaderboard = async () => {
    const response = await fetch(API);

    if (!response.ok) {
        throw new Error("Failed to fetch leaderboard");
    }

    return await response.json();
};