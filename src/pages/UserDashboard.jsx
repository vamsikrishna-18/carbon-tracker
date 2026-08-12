import UserLayout from "../layouts/UserLayout";
import DashboardCard from "../components/user/DashboardCard";
import { useEffect, useState } from "react";

import {
  getDashboardData,
  getActivities,
} from "../services/activityService";

import {
  Leaf,
  Trophy,
  Flame,
  Target,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


function UserDashboard() {

  const [dashboard, setDashboard] = useState({
    totalEmission: 0,
    totalPoints: 0,
    totalActivities: 0,
    progress: 0,
  });

  const [activities, setActivities] = useState([]);

  const [chartData, setChartData] = useState([]);

  const [timeFilter, setTimeFilter] = useState("daily");


  // =========================================================
  // GENERATE CHART DATA
  // =========================================================

  const generateChartData = (activities, filter) => {

    const grouped = {};


    activities.forEach((activity) => {

      if (!activity.createdAt || activity.emission == null) {
        return;
      }


      const date = new Date(activity.createdAt);

      let key;


      if (filter === "daily") {

        key = date.toLocaleDateString();

      } else if (filter === "weekly") {

        const week = Math.ceil(
          date.getDate() / 7
        );

        key = `Week ${week}`;

      } else if (filter === "monthly") {

        key = date.toLocaleString(
          "default",
          {
            month: "short",
          }
        );

      }


      if (!grouped[key]) {
        grouped[key] = 0;
      }


      grouped[key] += activity.emission;
    });


    return Object.keys(grouped).map((key) => ({
      date: key,
      emission: Number(
        grouped[key].toFixed(2)
      ),
    }));
  };


  // =========================================================
  // LOAD DASHBOARD DATA
  // =========================================================

  useEffect(() => {

    const userData =
      localStorage.getItem("user");


    if (!userData) {
      console.error("User not found in localStorage");
      return;
    }


    let user;

    try {

      user = JSON.parse(userData);

    } catch (error) {

      console.error(
        "Invalid user data:",
        error
      );

      return;
    }


    if (!user || !user.id) {

      console.error(
        "Invalid user object:",
        user
      );

      return;
    }


    // =====================================================
    // DASHBOARD DATA
    // =====================================================

    getDashboardData(user.id)
      .then((res) => {

        console.log(
          "Dashboard Data:",
          res.data
        );

        setDashboard({
          totalEmission:
            res.data.totalEmission ?? 0,

          totalPoints:
            res.data.totalPoints ?? 0,

          totalActivities:
            res.data.totalActivities ?? 0,

          progress:
            res.data.progress ?? 0,
        });

      })
      .catch((err) => {

        console.error(
          "Dashboard Error:",
          err
        );

      });


    // =====================================================
    // ACTIVITIES DATA
    // =====================================================

    getActivities(user.id)
      .then((res) => {

        console.log(
          "Activities:",
          res.data
        );


        const allActivities =
          Array.isArray(res.data)
            ? res.data
            : [];


        const latestActivities =
          [...allActivities]
            .sort(
              (a, b) =>
                new Date(b.createdAt) -
                new Date(a.createdAt)
            )
            .slice(0, 5);


        setActivities(
          latestActivities
        );


        setChartData(
          generateChartData(
            allActivities,
            timeFilter
          )
        );

      })
      .catch((err) => {

        console.error(
          "Activities Error:",
          err
        );

        setActivities([]);
        setChartData([]);

      });

  }, [timeFilter]);


  // =========================================================
  // UI
  // =========================================================

  return (
    <UserLayout>

      {/* ================================================
          DASHBOARD CARDS
      ================================================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <DashboardCard
          title="Total CO₂"
          value={`${Number(
            dashboard.totalEmission || 0
          ).toFixed(2)} kg`}
          icon={<Leaf />}
        />


        <DashboardCard
          title="Eco Points"
          value={dashboard.totalPoints || 0}
          icon={<Trophy />}
        />


        <DashboardCard
          title="Activities"
          value={dashboard.totalActivities || 0}
          icon={<Flame />}
        />


        <DashboardCard
          title="Goal Progress"
          value={`${Number(
            dashboard.progress || 0
          ).toFixed(0)}%`}
          icon={<Target />}
        />

      </div>


      {/* ================================================
          CARBON EMISSION TREND
      ================================================= */}

      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

        <h2 className="text-2xl font-bold mb-5">
          Carbon Emission Trend
        </h2>


        {/* FILTER BUTTONS */}

        <div className="flex gap-4 mb-5">

          <button
            onClick={() =>
              setTimeFilter("daily")
            }
            className={`px-4 py-2 rounded ${
              timeFilter === "daily"
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Daily
          </button>


          <button
            onClick={() =>
              setTimeFilter("weekly")
            }
            className={`px-4 py-2 rounded ${
              timeFilter === "weekly"
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Weekly
          </button>


          <button
            onClick={() =>
              setTimeFilter("monthly")
            }
            className={`px-4 py-2 rounded ${
              timeFilter === "monthly"
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Monthly
          </button>

        </div>


        {/* CHART */}

        {chartData.length > 0 ? (

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <LineChart
              data={chartData}
            >

              <CartesianGrid />

              <XAxis
                dataKey="date"
              />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="emission"
                stroke="#16a34a"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        ) : (

          <p className="text-gray-500">
            No emission data available.
          </p>

        )}

      </div>


      {/* ================================================
          BOTTOM SECTION
      ================================================= */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">


        {/* ==============================================
            RECENT ACTIVITIES
        =============================================== */}

        <div className="xl:col-span-2 bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-5">
            Recent Activities
          </h2>


          {activities.length > 0 ? (

            activities.map((activity) => (

              <div
                key={activity.id}
                className="flex justify-between items-center border-b py-4"
              >

                <div>

                  <h3 className="font-semibold">
                    {activity.activityType}
                  </h3>


                  <p className="text-gray-500 text-sm">

                    {activity.createdAt
                      ? new Date(
                          activity.createdAt
                        ).toLocaleDateString()
                      : "Unknown date"}

                  </p>

                </div>


                <span className="font-bold text-green-700">

                  {Number(
                    activity.emission || 0
                  ).toFixed(2)}{" "}
                  kg CO₂

                </span>

              </div>

            ))

          ) : (

            <p className="text-gray-500">
              No activities found.
            </p>

          )}

        </div>


        {/* ==============================================
            ECO TIPS
        =============================================== */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-5">
            🌿 Eco Tips
          </h2>


          <ul className="space-y-4 text-gray-600">

            <li>
              ✅ Walk or cycle for short trips.
            </li>

            <li>
              ✅ Turn off unused lights.
            </li>

            <li>
              ✅ Reduce plastic waste.
            </li>

            <li>
              ✅ Save water whenever possible.
            </li>

            <li>
              ✅ Plant a tree this month.
            </li>

          </ul>

        </div>

      </div>

    </UserLayout>
  );
}


export default UserDashboard;