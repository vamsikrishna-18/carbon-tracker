const API = "http://localhost:8080/api/leaderboard";

export const getLeaderboard = async () => {
    const response = await fetch(API);

    if (!response.ok) {
        throw new Error("Failed to fetch leaderboard");
    }

    return await response.json();
};