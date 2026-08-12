import { useEffect, useState } from "react";
import OrganizationLayout from "../layouts/OrganizationLayout";
import {
  Trophy,
  Medal,
  Leaf,
  RefreshCw,
} from "lucide-react";

import { getOrganizationLeaderboard } from "../services/organizationService";

function OrganizationLeaderboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getOrganizationLeaderboard();

      console.log("Organization leaderboard:", response.data);

      const data = response.data;

      if (Array.isArray(data)) {
        setEmployees(data);
      } else if (Array.isArray(data.leaderboard)) {
        setEmployees(data.leaderboard);
      } else {
        setEmployees([]);
      }

    } catch (err) {
      console.error("Failed to load leaderboard:", err);
      setError("Failed to load leaderboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeaderboard();
  }, []);

  return (
    <OrganizationLayout>
      <div className="w-full max-w-[1200px] mx-auto">

        {/* HEADER */}
        <div className="mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                Leaderboard
              </h1>

              <p className="mt-2 text-gray-500 dark:text-gray-400">
                See how employees are performing in sustainability activities.
              </p>
            </div>

            <button
              onClick={loadLeaderboard}
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2.5
                rounded-xl
                bg-green-600
                text-white
                font-semibold
                hover:bg-green-700
              "
            >
              <RefreshCw size={18} />
              Refresh
            </button>

          </div>

        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-100 text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="p-10 text-center text-gray-500">
            Loading leaderboard...
          </div>
        ) : employees.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No leaderboard data available.
          </div>
        ) : (
          <>
            {/* TOP 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

              {employees.slice(0, 3).map((employee, index) => {

                const rank =
                  employee.rank ??
                  index + 1;

                const name =
                  employee.name ||
                  employee.fullName ||
                  employee.employeeName ||
                  `Employee ${rank}`;

                const points =
                  Number(
                    employee.points ??
                    employee.ecoPoints ??
                    0
                  );

                return (
                  <div
                    key={employee.id || rank}
                    className="
                      bg-white
                      dark:bg-gray-800
                      border
                      border-gray-200
                      dark:border-gray-700
                      rounded-2xl
                      shadow-lg
                      p-6
                      text-center
                    "
                  >

                    <div
                      className="
                        mx-auto
                        w-16
                        h-16
                        rounded-full
                        bg-yellow-100
                        dark:bg-yellow-900/40
                        text-yellow-600
                        flex
                        items-center
                        justify-center
                        mb-4
                      "
                    >
                      {rank === 1 ? (
                        <Trophy size={30} />
                      ) : (
                        <Medal size={30} />
                      )}
                    </div>

                    <h2 className="font-bold text-xl text-gray-900 dark:text-white">
                      {name}
                    </h2>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Rank #{rank}
                    </p>

                    <p className="text-2xl font-extrabold text-green-600 mt-4">
                      {points}
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Eco Points
                    </p>

                  </div>
                );
              })}

            </div>

            {/* TABLE */}
            <div
              className="
                bg-white
                dark:bg-gray-800
                border
                border-gray-200
                dark:border-gray-700
                rounded-2xl
                shadow-lg
                overflow-hidden
              "
            >

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead className="bg-gray-50 dark:bg-gray-900/50">

                    <tr>

                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Rank
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Employee
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Eco Points
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Carbon Footprint
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {employees.map((employee, index) => {

                      const rank =
                        employee.rank ??
                        index + 1;

                      const name =
                        employee.name ||
                        employee.fullName ||
                        employee.employeeName ||
                        `Employee ${rank}`;

                      const points =
                        Number(
                          employee.points ??
                          employee.ecoPoints ??
                          0
                        );

                      const emission =
                        Number(
                          employee.emission ??
                          employee.totalEmission ??
                          employee.totalEmissions ??
                          0
                        );

                      return (
                        <tr
                          key={employee.id || rank}
                          className="
                            border-t
                            border-gray-100
                            dark:border-gray-700
                          "
                        >

                          <td className="px-6 py-4">

                            <span
                              className="
                                inline-flex
                                w-9
                                h-9
                                rounded-full
                                bg-green-100
                                text-green-700
                                items-center
                                justify-center
                                font-bold
                              "
                            >
                              {rank}
                            </span>

                          </td>

                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {name}
                          </td>

                          <td className="px-6 py-4 font-bold text-green-600">
                            {points}
                          </td>

                          <td className="px-6 py-4">

                            <div className="flex items-center gap-2">

                              <Leaf
                                size={17}
                                className="text-green-600"
                              />

                              <span className="text-gray-700 dark:text-gray-300">
                                {emission.toFixed(2)} kg
                              </span>

                            </div>

                          </td>

                        </tr>
                      );
                    })}

                  </tbody>

                </table>

              </div>

            </div>
          </>
        )}

      </div>
    </OrganizationLayout>
  );
}

export default OrganizationLeaderboard;