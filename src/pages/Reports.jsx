import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import {
  getAnalyticsDetails,
  getAllActivities,
} from "../services/adminService";

import {
  Download,
  Activity,
  Leaf,
  TrendingUp,
  BarChart3,
  RefreshCw,
} from "lucide-react";

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
} from "recharts";

function Reports() {
  const [activities, setActivities] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const [filter, setFilter] = useState("daily");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const COLORS = [
    "#16a34a",
    "#2563eb",
    "#dc2626",
    "#ca8a04",
    "#9333ea",
    "#0891b2",
  ];

  // =====================================================
  // LOAD REPORT DATA
  // =====================================================

  const loadReportData = async () => {
    try {
      setLoading(true);
      setError("");

      const [activityResponse, analyticsResponse] =
        await Promise.all([
          getAllActivities(),
          getAnalyticsDetails(filter),
        ]);

      const activityArray = Array.isArray(
        activityResponse.data
      )
        ? activityResponse.data
        : [];

      setActivities(activityArray);

      // -----------------------------
      // Trend Data
      // -----------------------------

      const trendArray = Object.keys(
        analyticsResponse.data?.trendData || {}
      ).map((key) => ({
        date: key,
        emission:
          Number(
            analyticsResponse.data.trendData[key]
          ) || 0,
      }));

      setTrendData(trendArray);

      // -----------------------------
      // Category Data
      // -----------------------------

      const categoryArray = Object.keys(
        analyticsResponse.data?.categoryData || {}
      ).map((key) => ({
        name: key,
        value:
          Number(
            analyticsResponse.data.categoryData[key]
          ) || 0,
      }));

      setCategoryData(categoryArray);
    } catch (err) {
      console.error(
        "Error loading report data:",
        err
      );

      setError(
        "Unable to load report data. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReportData();
  }, [filter]);

  // =====================================================
  // REPORT CALCULATIONS
  // =====================================================

  const totalActivities = activities.length;

  const totalEmissions = useMemo(() => {
    return activities.reduce((total, activity) => {
      return (
        total +
        (Number(activity.emission) || 0)
      );
    }, 0);
  }, [activities]);

  const averageEmission =
    totalActivities > 0
      ? totalEmissions / totalActivities
      : 0;

  const totalCategories = categoryData.length;

  // =====================================================
  // CATEGORY TABLE DATA
  // =====================================================

  const categorySummary = useMemo(() => {
    const summary = {};

    activities.forEach((activity) => {
      const category =
        activity.category || "Other";

      if (!summary[category]) {
        summary[category] = {
          category,
          activities: 0,
          emission: 0,
        };
      }

      summary[category].activities += 1;

      summary[category].emission +=
        Number(activity.emission) || 0;
    });

    return Object.values(summary).sort(
      (a, b) => b.emission - a.emission
    );
  }, [activities]);

  // =====================================================
  // DOWNLOAD CSV REPORT
  // =====================================================

  const downloadCSV = () => {
    if (activities.length === 0) {
      return;
    }

    const headers = [
      "Activity ID",
      "User ID",
      "Activity",
      "Category",
      "Emission (kg)",
      "Date",
    ];

    const rows = activities.map(
      (activity) => [
        activity.id ?? "",
        activity.userId ?? "",
        activity.activityType ?? "",
        activity.category ?? "Other",
        activity.emission ?? 0,
        activity.createdAt
          ? new Date(
              activity.createdAt
            ).toLocaleDateString()
          : "",
      ]
    );

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) =>
            `"${String(value).replace(
              /"/g,
              '""'
            )}"`
          )
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      `carbon-tracker-report-${filter}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[500px]">
          <div className="text-center">
            <RefreshCw
              size={40}
              className="animate-spin mx-auto text-green-600"
            />

            <p className="mt-4 text-gray-600">
              Loading reports...
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <AdminLayout>
      <div className="space-y-8">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Carbon Reports
            </h1>

            <p className="text-gray-500 mt-1">
              Monitor platform activities and
              carbon emissions.
            </p>
          </div>

          <div className="flex gap-3">

            <button
              onClick={loadReportData}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              <RefreshCw size={18} />

              Refresh
            </button>

            <button
              onClick={downloadCSV}
              disabled={activities.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
            >
              <Download size={18} />

              Export CSV
            </button>

          </div>

        </div>


        {/* ================================================= */}
        {/* ERROR */}
        {/* ================================================= */}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
            {error}
          </div>
        )}


        {/* ================================================= */}
        {/* SUMMARY CARDS */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Activities */}

          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">

            <div className="flex justify-between items-center">

              <div>
                <p className="text-gray-500">
                  Total Activities
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {totalActivities}
                </h2>
              </div>

              <div className="p-3 bg-blue-100 rounded-lg">
                <Activity
                  className="text-blue-600"
                  size={28}
                />
              </div>

            </div>

          </div>


          {/* Total Emissions */}

          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-green-500">

            <div className="flex justify-between items-center">

              <div>
                <p className="text-gray-500">
                  Total Emissions
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {totalEmissions.toFixed(2)}
                </h2>

                <p className="text-sm text-gray-500">
                  kg CO₂
                </p>
              </div>

              <div className="p-3 bg-green-100 rounded-lg">
                <Leaf
                  className="text-green-600"
                  size={28}
                />
              </div>

            </div>

          </div>


          {/* Average */}

          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-purple-500">

            <div className="flex justify-between items-center">

              <div>
                <p className="text-gray-500">
                  Average Emission
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {averageEmission.toFixed(2)}
                </h2>

                <p className="text-sm text-gray-500">
                  kg / activity
                </p>
              </div>

              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp
                  className="text-purple-600"
                  size={28}
                />
              </div>

            </div>

          </div>


          {/* Categories */}

          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-orange-500">

            <div className="flex justify-between items-center">

              <div>
                <p className="text-gray-500">
                  Categories
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {totalCategories}
                </h2>

                <p className="text-sm text-gray-500">
                  Activity categories
                </p>
              </div>

              <div className="p-3 bg-orange-100 rounded-lg">
                <BarChart3
                  className="text-orange-600"
                  size={28}
                />
              </div>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* FILTER */}
        {/* ================================================= */}

        <div className="bg-white rounded-xl shadow p-5">

          <div className="flex flex-wrap items-center gap-3">

            <span className="font-semibold text-gray-700">
              Report Period:
            </span>

            {[
              "daily",
              "weekly",
              "monthly",
            ].map((item) => (

              <button
                key={item}
                onClick={() =>
                  setFilter(item)
                }
                className={`px-5 py-2 rounded-lg font-medium transition ${
                  filter === item
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {item
                  .charAt(0)
                  .toUpperCase() +
                  item.slice(1)}
              </button>

            ))}

          </div>

        </div>


        {/* ================================================= */}
        {/* TREND CHART */}
        {/* ================================================= */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            Emission Trend
          </h2>

          <div className="h-96">

            {trendData.length === 0 ? (

              <div className="flex items-center justify-center h-full text-gray-500">
                No trend data available.
              </div>

            ) : (

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

                  <Line
                    type="monotone"
                    dataKey="emission"
                    stroke="#16a34a"
                    strokeWidth={3}
                  />

                </LineChart>

              </ResponsiveContainer>

            )}

          </div>

        </div>


        {/* ================================================= */}
        {/* PIE + BAR */}
        {/* ================================================= */}

        <div className="grid lg:grid-cols-2 gap-6">

          {/* PIE */}

          <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-5">
              Emission Distribution
            </h2>

            <div className="h-80">

              {categoryData.length === 0 ? (

                <div className="flex items-center justify-center h-full text-gray-500">
                  No category data available.
                </div>

              ) : (

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <PieChart>

                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={110}
                      label
                    >

                      {categoryData.map(
                        (entry, index) => (

                          <Cell
                            key={index}
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


          {/* BAR */}

          <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-5">
              Emission By Category
            </h2>

            <div className="h-80">

              {categoryData.length === 0 ? (

                <div className="flex items-center justify-center h-full text-gray-500">
                  No category data available.
                </div>

              ) : (

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart
                    data={categoryData}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                    />

                    <XAxis
                      dataKey="name"
                    />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="value"
                      fill="#16a34a"
                    />

                  </BarChart>

                </ResponsiveContainer>

              )}

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* CATEGORY SUMMARY TABLE */}
        {/* ================================================= */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-5">
            Category Summary
          </h2>

          {categorySummary.length === 0 ? (

            <div className="text-center py-10 text-gray-500">
              No activity data available.
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b">

                    <th className="text-left p-3">
                      Category
                    </th>

                    <th className="text-left p-3">
                      Activities
                    </th>

                    <th className="text-left p-3">
                      Emissions
                    </th>

                    <th className="text-left p-3">
                      Percentage
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {categorySummary.map(
                    (item) => {

                      const percentage =
                        totalEmissions > 0
                          ? (item.emission /
                              totalEmissions) *
                            100
                          : 0;

                      return (
                        <tr
                          key={
                            item.category
                          }
                          className="border-b hover:bg-gray-50"
                        >

                          <td className="p-3 font-medium">
                            {item.category}
                          </td>

                          <td className="p-3">
                            {item.activities}
                          </td>

                          <td className="p-3 text-red-600">
                            {item.emission.toFixed(
                              2
                            )}{" "}
                            kg
                          </td>

                          <td className="p-3">

                            <div className="flex items-center gap-3">

                              <div className="w-32 bg-gray-200 rounded-full h-2">

                                <div
                                  className="bg-green-600 h-2 rounded-full"
                                  style={{
                                    width: `${Math.min(
                                      percentage,
                                      100
                                    )}%`,
                                  }}
                                />

                              </div>

                              <span>
                                {percentage.toFixed(
                                  1
                                )}
                                %
                              </span>

                            </div>

                          </td>

                        </tr>
                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>
    </AdminLayout>
  );
}

export default Reports;