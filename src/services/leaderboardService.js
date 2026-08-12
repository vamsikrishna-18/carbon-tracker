const API = `${import.meta.env.VITE_BACKEND_URL}/api/leaderboard`;

export const getLeaderboard = async () => {
    const response = await fetch(API);

    if (!response.ok) {
        throw new Error("Failed to fetch leaderboard");
    }

    return await response.json();
};