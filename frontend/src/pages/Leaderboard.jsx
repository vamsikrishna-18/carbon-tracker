import { useEffect, useState } from "react";
import UserLayout from "../layouts/UserLayout";
import { getLeaderboard } from "../services/leaderboardService";

function Leaderboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getLeaderboard()
            .then((data) => setUsers(data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <UserLayout>

            <div className="p-6">

                {/* ================= HEADER ================= */}
                <div className="mb-8">

                    <h1 className="text-3xl md:text-4xl font-bold
                        text-gray-900 dark:text-white">
                        🏆 Leaderboard
                    </h1>

                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                        See how you rank among other Carbon Tracker users.
                    </p>

                </div>


                {/* ================= LEADERBOARD CARD ================= */}

                <div className="
                    bg-white dark:bg-slate-800
                    rounded-2xl
                    shadow-lg
                    border border-gray-200 dark:border-slate-700
                    overflow-hidden
                ">

                    {/* Card Header */}

                    <div className="
                        px-6 md:px-8
                        py-5
                        border-b
                        border-gray-200 dark:border-slate-700
                    ">

                        <h2 className="
                            text-xl
                            font-bold
                            text-gray-900 dark:text-white
                        ">
                            Top Performers
                        </h2>

                        <p className="
                            text-sm
                            text-gray-500 dark:text-gray-400
                            mt-1
                        ">
                            Users with the highest eco points
                        </p>

                    </div>


                    {/* ================= TABLE ================= */}

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[750px] table-fixed">

                            {/* ================= HEADER ================= */}

                            <thead>

                                <tr className="
                                    bg-gray-50
                                    dark:bg-slate-700/60
                                    border-b
                                    border-gray-200
                                    dark:border-slate-600
                                ">

                                    <th className="
                                        w-[15%]
                                        px-6
                                        py-5
                                        text-center
                                        text-sm
                                        font-bold
                                        text-gray-700
                                        dark:text-gray-200
                                    ">
                                        Rank
                                    </th>

                                    <th className="
                                        w-[35%]
                                        px-6
                                        py-5
                                        text-left
                                        text-sm
                                        font-bold
                                        text-gray-700
                                        dark:text-gray-200
                                    ">
                                        User
                                    </th>

                                    <th className="
                                        w-[25%]
                                        px-6
                                        py-5
                                        text-center
                                        text-sm
                                        font-bold
                                        text-gray-700
                                        dark:text-gray-200
                                    ">
                                        Eco Points
                                    </th>

                                    <th className="
                                        w-[25%]
                                        px-6
                                        py-5
                                        text-center
                                        text-sm
                                        font-bold
                                        text-gray-700
                                        dark:text-gray-200
                                    ">
                                        Emission
                                    </th>

                                </tr>

                            </thead>


                            {/* ================= BODY ================= */}

                            <tbody>

                                {users.length > 0 ? (

                                    users.map((user) => (

                                        <tr
                                            key={user.userId}
                                            className="
                                                border-b
                                                border-gray-200
                                                dark:border-slate-700
                                                last:border-b-0
                                                hover:bg-gray-50
                                                dark:hover:bg-slate-700/50
                                                transition-colors
                                            "
                                        >

                                            {/* Rank */}

                                            <td className="
                                                px-6
                                                py-5
                                                text-center
                                                text-lg
                                                text-gray-800
                                                dark:text-gray-200
                                            ">

                                                {user.rank === 1
                                                    ? "🥇"
                                                    : user.rank === 2
                                                    ? "🥈"
                                                    : user.rank === 3
                                                    ? "🥉"
                                                    : (
                                                        <span className="
                                                            font-semibold
                                                        ">
                                                            {user.rank}
                                                        </span>
                                                    )
                                                }

                                            </td>


                                            {/* User */}

                                            <td className="
                                                px-6
                                                py-5
                                                text-left
                                            ">

                                                <span className="
                                                    font-semibold
                                                    text-gray-900
                                                    dark:text-white
                                                    break-words
                                                ">
                                                    {user.fullName}
                                                </span>

                                            </td>


                                            {/* Eco Points */}

                                            <td className="
                                                px-6
                                                py-5
                                                text-center
                                            ">

                                                <span className="
                                                    inline-flex
                                                    items-center
                                                    justify-center
                                                    min-w-[90px]
                                                    px-4
                                                    py-2
                                                    rounded-full
                                                    bg-green-100
                                                    dark:bg-green-900/40
                                                    text-green-700
                                                    dark:text-green-300
                                                    font-bold
                                                ">
                                                    {user.totalEcoPoints}
                                                </span>

                                            </td>


                                            {/* Emission */}

                                            <td className="
                                                px-6
                                                py-5
                                                text-center
                                            ">

                                                <span className="
                                                    text-gray-700
                                                    dark:text-gray-200
                                                    font-medium
                                                    whitespace-nowrap
                                                ">
                                                    {user.totalEmission} kg CO₂
                                                </span>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="4"
                                            className="
                                                px-6
                                                py-12
                                                text-center
                                                text-gray-500
                                                dark:text-gray-400
                                            "
                                        >
                                            No leaderboard data available.
                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </UserLayout>
    );
}

export default Leaderboard;