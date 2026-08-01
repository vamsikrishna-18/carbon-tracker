import { useEffect, useState } from "react";
import UserLayout from "../layouts/UserLayout";
import { getLeaderboard } from "../services/leaderboardService";

function Leaderboard() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        getLeaderboard()
            .then(data => setUsers(data))
            .catch(error => console.log(error));

    }, []);


    return (
        <UserLayout>

            <div className="p-6">

                <h1 className="text-3xl font-bold mb-6">
                    🏆 Leaderboard
                </h1>


                <div className="bg-white rounded-xl shadow p-5">

                    <table className="w-full">

                        <thead>
                            <tr className="border-b">
                                <th>Rank</th>
                                <th>User</th>
                                <th>Eco Points</th>
                                <th>Emission</th>
                            </tr>
                        </thead>


                        <tbody>

                        {
                            users.map(user => (

                                <tr key={user.userId}
                                    className="border-b text-center">

                                    <td>
                                        {
                                            user.rank === 1 ? "🥇" :
                                            user.rank === 2 ? "🥈" :
                                            user.rank === 3 ? "🥉" :
                                            user.rank
                                        }
                                    </td>

                                    <td>
                                        {user.fullName}
                                    </td>

                                    <td>
                                        {user.totalEcoPoints}
                                    </td>

                                    <td>
                                        {user.totalEmission} kg CO₂
                                    </td>

                                </tr>

                            ))
                        }

                        </tbody>

                    </table>

                </div>

            </div>

        </UserLayout>
    );
}

export default Leaderboard;