import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { getUsers, getAdminAnalytics } from "../services/adminService";

import {
  Users,
  Activity,
  Flame,
  BarChart3,
  AlertCircle,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);

  const [analytics, setAnalytics] = useState({
    totalEmission: 0,
    totalActivities: 0,
    categoryData: {},
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // LOAD DASHBOARD DATA
  // =====================================================

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError("");

      try {
        const [usersResponse, analyticsResponse] =
          await Promise.all([
            getUsers(),
            getAdminAnalytics(),
          ]);

        console.log("Admin Users Response:", usersResponse);
        console.log(
          "Admin Analytics Response:",
          analyticsResponse
        );

        // =================================================
        // USERS
        // =================================================

        const usersData = usersResponse?.data;

        if (Array.isArray(usersData)) {
          setTotalUsers(usersData.length);
        } else if (Array.isArray(usersData?.users)) {
          setTotalUsers(usersData.users.length);
        } else {
          setTotalUsers(0);
        }

        // =================================================
        // ANALYTICS
        // =================================================

        const data = analyticsResponse?.data || {};

        const safeCategoryData =
          data.categoryData &&
          typeof data.categoryData === "object" &&
          !Array.isArray(data.categoryData)
            ? data.categoryData
            : {};

        setAnalytics({
          totalEmission: Number(
            data.totalEmission ?? 0
          ),

          totalActivities: Number(
            data.totalActivities ?? 0
          ),

          categoryData: safeCategoryData,
        });
      } catch (err) {
        console.error(
          "Admin Dashboard Error:",
          err
        );

        setError(
          "Unable to load dashboard data. Please try again."
        );

        setTotalUsers(0);

        setAnalytics({
          totalEmission: 0,
          totalActivities: 0,
          categoryData: {},
        });
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  // =====================================================
  // PIE CHART DATA
  // =====================================================

  const chartData = Object.entries(
    analytics?.categoryData || {}
  )
    .filter(
      ([, value]) =>
        value !== null &&
        value !== undefined &&
        !Number.isNaN(Number(value))
    )
    .map(([key, value]) => ({
      name: key,
      value: Number(value),
    }))
    .filter((item) => item.value > 0);

  // =====================================================
  // COLORS
  // =====================================================

  const COLORS = [
    "#16a34a",
    "#2563eb",
    "#dc2626",
    "#ca8a04",
    "#9333ea",
  ];

  // =====================================================
  // TOP CATEGORY
  // =====================================================

  const topCategory =
    chartData.length > 0
      ? [...chartData].sort(
          (a, b) => b.value - a.value
        )[0]?.name || "N/A"
      : "N/A";

  // =====================================================
  // UI
  // =====================================================

  return (
    <AdminLayout>
      <div className="w-full">

        {/* ================================================= */}
        {/* PAGE TITLE */}
        {/* ================================================= */}

        <div className="mb-8">
          <h1
            className="
              text-3xl
              md:text-4xl
              font-bold
              text-gray-900
              dark:text-white
            "
          >
            Admin Dashboard
          </h1>

          <p
            className="
              mt-2
              text-gray-500
              dark:text-gray-400
            "
          >
            Monitor users, activities and platform-wide
            carbon emissions.
          </p>
        </div>

        {/* ================================================= */}
        {/* ERROR */}
        {/* ================================================= */}

        {error && (
          <div
            className="
              mb-6
              flex
              items-center
              gap-3
              p-4
              rounded-xl
              bg-red-50
              dark:bg-red-950/30
              border
              border-red-200
              dark:border-red-900
              text-red-700
              dark:text-red-400
            "
          >
            <AlertCircle size={22} />

            <p>{error}</p>
          </div>
        )}

        {/* ================================================= */}
        {/* LOADING */}
        {/* ================================================= */}

        {loading ? (
          <div
            className="
              flex
              items-center
              justify-center
              min-h-[400px]
            "
          >
            <div className="text-center">
              <div
                className="
                  w-12
                  h-12
                  border-4
                  border-green-200
                  border-t-green-600
                  rounded-full
                  animate-spin
                  mx-auto
                  mb-4
                "
              />

              <p
                className="
                  text-gray-600
                  dark:text-gray-300
                  font-medium
                "
              >
                Loading Admin Dashboard...
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* ================================================= */}
            {/* SUMMARY CARDS */}
            {/* ================================================= */}

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-6
                mb-8
              "
            >

              {/* TOTAL USERS */}

              <div
                className="
                  bg-white
                  dark:bg-gray-800
                  border
                  border-gray-200
                  dark:border-gray-700
                  rounded-xl
                  shadow-lg
                  p-6
                  flex
                  items-center
                  gap-4
                "
              >
                <div
                  className="
                    bg-blue-100
                    dark:bg-blue-900/40
                    text-blue-700
                    dark:text-blue-400
                    p-4
                    rounded-full
                  "
                >
                  <Users size={32} />
                </div>

                <div>
                  <p
                    className="
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    Total Users
                  </p>

                  <h2
                    className="
                      text-3xl
                      font-bold
                      text-gray-900
                      dark:text-white
                    "
                  >
                    {totalUsers}
                  </h2>
                </div>
              </div>

              {/* TOTAL EMISSIONS */}

              <div
                className="
                  bg-white
                  dark:bg-gray-800
                  border
                  border-gray-200
                  dark:border-gray-700
                  rounded-xl
                  shadow-lg
                  p-6
                  flex
                  items-center
                  gap-4
                "
              >
                <div
                  className="
                    bg-red-100
                    dark:bg-red-900/40
                    text-red-700
                    dark:text-red-400
                    p-4
                    rounded-full
                  "
                >
                  <Flame size={32} />
                </div>

                <div>
                  <p
                    className="
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    Total Emissions
                  </p>

                  <h2
                    className="
                      text-3xl
                      font-bold
                      text-gray-900
                      dark:text-white
                    "
                  >
                    {Number(
                      analytics.totalEmission || 0
                    ).toFixed(2)}{" "}
                    kg
                  </h2>
                </div>
              </div>

              {/* TOTAL ACTIVITIES */}

              <div
                className="
                  bg-white
                  dark:bg-gray-800
                  border
                  border-gray-200
                  dark:border-gray-700
                  rounded-xl
                  shadow-lg
                  p-6
                  flex
                  items-center
                  gap-4
                "
              >
                <div
                  className="
                    bg-green-100
                    dark:bg-green-900/40
                    text-green-700
                    dark:text-green-400
                    p-4
                    rounded-full
                  "
                >
                  <Activity size={32} />
                </div>

                <div>
                  <p
                    className="
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    Total Activities
                  </p>

                  <h2
                    className="
                      text-3xl
                      font-bold
                      text-gray-900
                      dark:text-white
                    "
                  >
                    {analytics.totalActivities || 0}
                  </h2>
                </div>
              </div>
            </div>

            {/* ================================================= */}
            {/* ANALYTICS */}
            {/* ================================================= */}

            <div
              className="
                grid
                grid-cols-1
                lg:grid-cols-2
                gap-6
              "
            >

              {/* ================================================= */}
              {/* PIE CHART */}
              {/* ================================================= */}

              <div
                className="
                  bg-white
                  dark:bg-gray-800
                  border
                  border-gray-200
                  dark:border-gray-700
                  rounded-xl
                  shadow-lg
                  p-6
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    mb-5
                  "
                >
                  <div
                    className="
                      bg-green-100
                      dark:bg-green-900/40
                      text-green-700
                      dark:text-green-400
                      p-3
                      rounded-full
                    "
                  >
                    <BarChart3 size={24} />
                  </div>

                  <h2
                    className="
                      text-2xl
                      font-bold
                      text-gray-900
                      dark:text-white
                    "
                  >
                    Emission Distribution
                  </h2>
                </div>

                <div className="h-80">
                  {chartData.length === 0 ? (
                    <div
                      className="
                        h-full
                        flex
                        items-center
                        justify-center
                        text-gray-500
                        dark:text-gray-400
                      "
                    >
                      No emission data available.
                    </div>
                  ) : (
                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                    >
                      <PieChart>
                        <Pie
                          data={chartData}
                          dataKey="value"
                          nameKey="name"
                          outerRadius={110}
                          label
                        >
                          {chartData.map(
                            (entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  COLORS[
                                    index %
                                      COLORS.length
                                  ]
                                }
                              />
                            )
                          )}
                        </Pie>

                        <Tooltip />

                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              {/* ================================================= */}
              {/* PLATFORM INSIGHTS */}
              {/* ================================================= */}

              <div
                className="
                  bg-white
                  dark:bg-gray-800
                  border
                  border-gray-200
                  dark:border-gray-700
                  rounded-xl
                  shadow-lg
                  p-6
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    mb-5
                  "
                >
                  <div
                    className="
                      bg-purple-100
                      dark:bg-purple-900/40
                      text-purple-700
                      dark:text-purple-400
                      p-3
                      rounded-full
                    "
                  >
                    <Flame size={24} />
                  </div>

                  <h2
                    className="
                      text-2xl
                      font-bold
                      text-gray-900
                      dark:text-white
                    "
                  >
                    Platform Insights
                  </h2>
                </div>

                <div className="space-y-4">

                  {/* USERS */}

                  <div
                    className="
                      bg-blue-50
                      dark:bg-blue-950/40
                      border
                      border-blue-100
                      dark:border-blue-900
                      p-4
                      rounded-lg
                    "
                  >
                    <p
                      className="
                        text-sm
                        text-gray-500
                        dark:text-gray-400
                      "
                    >
                      Registered Users
                    </p>

                    <p
                      className="
                        text-2xl
                        font-bold
                        text-blue-700
                        dark:text-blue-400
                      "
                    >
                      {totalUsers}
                    </p>
                  </div>

                  {/* EMISSIONS */}

                  <div
                    className="
                      bg-red-50
                      dark:bg-red-950/40
                      border
                      border-red-100
                      dark:border-red-900
                      p-4
                      rounded-lg
                    "
                  >
                    <p
                      className="
                        text-sm
                        text-gray-500
                        dark:text-gray-400
                      "
                    >
                      Carbon Emissions
                    </p>

                    <p
                      className="
                        text-2xl
                        font-bold
                        text-red-700
                        dark:text-red-400
                      "
                    >
                      {Number(
                        analytics.totalEmission || 0
                      ).toFixed(2)}{" "}
                      kg
                    </p>
                  </div>

                  {/* ACTIVITIES */}

                  <div
                    className="
                      bg-green-50
                      dark:bg-green-950/40
                      border
                      border-green-100
                      dark:border-green-900
                      p-4
                      rounded-lg
                    "
                  >
                    <p
                      className="
                        text-sm
                        text-gray-500
                        dark:text-gray-400
                      "
                    >
                      Activities Logged
                    </p>

                    <p
                      className="
                        text-2xl
                        font-bold
                        text-green-700
                        dark:text-green-400
                      "
                    >
                      {analytics.totalActivities || 0}
                    </p>
                  </div>

                  {/* TOP CATEGORY */}

                  <div
                    className="
                      bg-yellow-50
                      dark:bg-yellow-950/40
                      border
                      border-yellow-100
                      dark:border-yellow-900
                      p-4
                      rounded-lg
                    "
                  >
                    <p
                      className="
                        text-sm
                        text-gray-500
                        dark:text-gray-400
                      "
                    >
                      Top Category
                    </p>

                    <p
                      className="
                        text-2xl
                        font-bold
                        text-yellow-700
                        dark:text-yellow-400
                      "
                    >
                      {topCategory}
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;