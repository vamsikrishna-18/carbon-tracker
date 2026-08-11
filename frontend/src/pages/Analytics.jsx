import { useEffect, useState } from "react";
import UserLayout from "../layouts/UserLayout";
import { getAnalytics } from "../services/activityService";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

function Analytics() {
  const [timeFilter, setTimeFilter] = useState("daily");

  const [trendData, setTrendData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ============================================================
  // LOAD ANALYTICS
  // ============================================================

  useEffect(() => {
    const loadAnalytics = async () => {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setError("User session not found.");
        return;
      }

      let user;

      try {
        user = JSON.parse(storedUser);
      } catch (err) {
        console.error("Invalid user data:", err);
        setError("Invalid user session.");
        return;
      }

      if (!user?.id) {
        setError("User ID not found.");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await getAnalytics(
          user.id,
          timeFilter
        );

        console.log(
          "Analytics Response:",
          response.data
        );

        const data = response?.data || {};

        // ======================================================
        // TREND DATA
        // ======================================================

        const safeTrendData = Array.isArray(
          data.trendData
        )
          ? data.trendData
          : [];

        setTrendData(safeTrendData);

        // ======================================================
        // CATEGORY DATA
        // ======================================================

        const rawCategoryData =
          data.categoryData;

        let categoryArray = [];

        // Backend returns an object:
        // {
        //   TRANSPORT: 20,
        //   FOOD: 10
        // }

        if (
          rawCategoryData &&
          typeof rawCategoryData === "object" &&
          !Array.isArray(rawCategoryData)
        ) {
          categoryArray = Object.entries(
            rawCategoryData
          ).map(([key, value]) => ({
            name: key,
            value: Number(value) || 0,
          }));
        }

        // If backend already returns an array,
        // support that too.
        else if (
          Array.isArray(rawCategoryData)
        ) {
          categoryArray = rawCategoryData
            .map((item) => ({
              name:
                item?.name ||
                item?.category ||
                "Unknown",

              value:
                Number(
                  item?.value ??
                  item?.emission ??
                  0
                ) || 0,
            }))
            .filter(
              (item) => item.value > 0
            );
        }

        setChartData(categoryArray);
      } catch (err) {
        console.error(
          "Analytics Error:",
          err
        );

        setTrendData([]);
        setChartData([]);

        setError(
          err?.response?.data?.message ||
            "Unable to load analytics data."
        );
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, [timeFilter]);

  // ============================================================
  // COLORS
  // ============================================================

  const COLORS = [
    "#16a34a",
    "#2563eb",
    "#dc2626",
    "#ca8a04",
    "#9333ea",
    "#0891b2",
    "#ea580c",
  ];

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <UserLayout>
      <div className="p-6">

        {/* ======================================================
            HEADER
        ====================================================== */}

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Analytics Dashboard
            </h1>

            <p className="text-gray-500 mt-1">
              Analyze your carbon emissions and activity trends.
            </p>
          </div>

          {/* FILTER */}

          <div className="flex gap-2">

            {["daily", "weekly", "monthly"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() =>
                    setTimeFilter(item)
                  }
                  className={`px-4 py-2 rounded-lg capitalize transition ${
                    timeFilter === item
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {item}
                </button>
              )
            )}

          </div>
        </div>

        {/* ======================================================
            ERROR
        ====================================================== */}

        {error && !loading && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
            {error}
          </div>
        )}

        {/* ======================================================
            LOADING
        ====================================================== */}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-xl text-gray-500">
              Loading Analytics...
            </p>
          </div>
        ) : (
          <>
            {/* ==================================================
                LINE CHART
            ================================================== */}

            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

              <h2 className="text-2xl font-bold mb-5">
                Emission Trend
              </h2>

              {trendData.length > 0 ? (
                <div className="h-80">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <LineChart
                      data={trendData}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                      />

                      <XAxis
                        dataKey="date"
                      />

                      <YAxis />

                      <Tooltip />

                      <Legend />

                      <Line
                        type="monotone"
                        dataKey="emission"
                        stroke="#16a34a"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>

                </div>
              ) : (
                <div className="h-80 flex items-center justify-center">
                  <p className="text-gray-500">
                    No emission trend data available.
                  </p>
                </div>
              )}

            </div>

            {/* ==================================================
                PIE + BAR
            ================================================== */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* =================================================
                  PIE CHART
              ================================================= */}

              <div className="bg-white rounded-xl shadow-lg p-6">

                <h2 className="text-2xl font-bold mb-5">
                  Emission Distribution
                </h2>

                {chartData.length > 0 ? (
                  <div className="h-80">

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

                        <Legend />

                      </PieChart>
                    </ResponsiveContainer>

                  </div>
                ) : (
                  <div className="h-80 flex items-center justify-center">
                    <p className="text-gray-500">
                      No category data available.
                    </p>
                  </div>
                )}

              </div>

              {/* =================================================
                  BAR CHART
              ================================================= */}

              <div className="bg-white rounded-xl shadow-lg p-6">

                <h2 className="text-2xl font-bold mb-5">
                  Emission By Category
                </h2>

                {chartData.length > 0 ? (
                  <div className="h-80">

                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                    >
                      <BarChart
                        data={chartData}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                        />

                        <XAxis
                          dataKey="name"
                        />

                        <YAxis />

                        <Tooltip />

                        <Legend />

                        <Bar
                          dataKey="value"
                          fill="#16a34a"
                        />
                      </BarChart>
                    </ResponsiveContainer>

                  </div>
                ) : (
                  <div className="h-80 flex items-center justify-center">
                    <p className="text-gray-500">
                      No category data available.
                    </p>
                  </div>
                )}

              </div>

            </div>
          </>
        )}

      </div>
    </UserLayout>
  );
}

export default Analytics;