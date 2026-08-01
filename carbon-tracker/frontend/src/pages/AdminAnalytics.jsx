import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { getAnalyticsDetails } from "../services/adminService";

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
  Bar
} from "recharts";

function AdminAnalytics() {

  const [trendData, setTrendData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [filter, setFilter] = useState("daily");
  useEffect(() => {

  getAnalyticsDetails(filter)
    .then((res) => {

      console.log("Backend Response:", res.data);

      const trendArray = Object.keys(
        res.data.trendData || {}
      ).map((key) => ({
        date: key,
        emission: res.data.trendData[key]
      }));

      setTrendData(trendArray);

      const categoryArray = Object.keys(
        res.data.categoryData || {}
      ).map((key) => ({
        name: key,
        value: res.data.categoryData[key]
      }));

      setChartData(categoryArray);

    })
    .catch((err) => {
      console.error(err);
    });

}, [filter]);

  const COLORS = [
    "#16a34a",
    "#2563eb",
    "#dc2626",
    "#ca8a04",
    "#9333ea"
  ];

  return (

  <AdminLayout>

    <h1 className="text-3xl font-bold mb-6">
      Platform Analytics
    </h1>

    {/* Debug Info */}

    <div className="bg-white p-4 rounded-xl shadow mb-6">

      <p className="font-semibold">
        Trend Data: {trendData.length}
      </p>

      <p className="font-semibold">
        Category Data: {chartData.length}
      </p>

    </div>

    {/* Trend Chart */}

    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

      <h2 className="text-2xl font-bold mb-5">
        Emission Trend
      </h2>
      <div className="flex gap-3 mb-6">

  {["daily", "weekly", "monthly"].map((item) => (

    <button
      key={item}
      onClick={() => setFilter(item)}
      className={`px-5 py-2 rounded-lg font-medium transition ${
        filter === item
          ? "bg-green-600 text-white"
          : "bg-gray-200 hover:bg-gray-300"
      }`}
    >
      {item.charAt(0).toUpperCase() + item.slice(1)}
    </button>

  ))}

</div>
      <div className="h-80">

        {trendData.length === 0 ? (

          <div className="flex items-center justify-center h-full text-gray-500">
            No trend data available
          </div>

        ) : (

          <ResponsiveContainer width="100%" height="100%">

            <LineChart data={trendData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="date" />

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

    {/* Pie & Bar */}

    <div className="grid lg:grid-cols-2 gap-6">

      {/* Pie Chart */}

      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-5">
          Emission Distribution
        </h2>

        <div className="h-80">

          {chartData.length === 0 ? (

            <div className="flex items-center justify-center h-full text-gray-500">
              No category data available
            </div>

          ) : (

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={110}
                  label
                >

                  {chartData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />

                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          )}

        </div>

      </div>

      {/* Bar Chart */}

      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-5">
          Emission By Category
        </h2>

        <div className="h-80">

          {chartData.length === 0 ? (

            <div className="flex items-center justify-center h-full text-gray-500">
              No category data available
            </div>

          ) : (

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={chartData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

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

  </AdminLayout>
);
}

export default AdminAnalytics;