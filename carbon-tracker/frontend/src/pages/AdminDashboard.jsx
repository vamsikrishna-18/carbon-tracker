import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { getUsers, getAdminAnalytics } from "../services/adminService";

import {
  Users,
  Activity,
  Flame,
  BarChart3
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function AdminDashboard() {

  const [totalUsers, setTotalUsers] = useState(0);
  const [analytics, setAnalytics] = useState({
    totalEmission: 0,
    totalActivities: 0,
    categoryData: {}
  });

  useEffect(() => {

    getUsers()
      .then((res) => setTotalUsers(res.data.length))
      .catch(console.error);

    getAdminAnalytics()
      .then((res) => setAnalytics(res.data))
      .catch(console.error);

  }, []);

  const chartData = Object.keys(analytics.categoryData).map((key) => ({
    name: key,
    value: analytics.categoryData[key]
  }));

  const COLORS = [
    "#16a34a",
    "#2563eb",
    "#dc2626",
    "#ca8a04",
    "#9333ea"
  ];

  return (

    <AdminLayout>

      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      {/* Summary Cards */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4">

          <div className="bg-blue-100 text-blue-700 p-4 rounded-full">
            <Users size={32} />
          </div>

          <div>

            <p className="text-gray-500">Total Users</p>

            <h2 className="text-3xl font-bold">
              {totalUsers}
            </h2>

          </div>

        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4">

          <div className="bg-red-100 text-red-700 p-4 rounded-full">
            <Flame size={32} />
          </div>

          <div>

            <p className="text-gray-500">Total Emissions</p>

            <h2 className="text-3xl font-bold">
              {analytics.totalEmission.toFixed(2)} kg
            </h2>

          </div>

        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4">

          <div className="bg-green-100 text-green-700 p-4 rounded-full">
            <Activity size={32} />
          </div>

          <div>

            <p className="text-gray-500">Total Activities</p>

            <h2 className="text-3xl font-bold">
              {analytics.totalActivities}
            </h2>

          </div>

        </div>

      </div>

      {/* Analytics Section */}

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Pie Chart */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <div className="flex items-center gap-3 mb-5">

            <div className="bg-green-100 text-green-700 p-3 rounded-full">
              <BarChart3 size={24} />
            </div>

            <h2 className="text-2xl font-bold">
              Emission Distribution
            </h2>

          </div>

          <div className="h-80">

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

          </div>

        </div>

        {/* Insights */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <div className="flex items-center gap-3 mb-5">

            <div className="bg-purple-100 text-purple-700 p-3 rounded-full">
              <Flame size={24} />
            </div>

            <h2 className="text-2xl font-bold">
              Platform Insights
            </h2>

          </div>

          <div className="space-y-4">

            <div className="bg-blue-50 p-4 rounded-lg">

              <p className="text-sm text-gray-500">Registered Users</p>

              <p className="text-2xl font-bold text-blue-700">
                {totalUsers}
              </p>

            </div>

            <div className="bg-red-50 p-4 rounded-lg">

              <p className="text-sm text-gray-500">Carbon Emissions</p>

              <p className="text-2xl font-bold text-red-700">
                {analytics.totalEmission.toFixed(2)} kg
              </p>

            </div>

            <div className="bg-green-50 p-4 rounded-lg">

              <p className="text-sm text-gray-500">Activities Logged</p>

              <p className="text-2xl font-bold text-green-700">
                {analytics.totalActivities}
              </p>

            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">

              <p className="text-sm text-gray-500">Top Category</p>

              <p className="text-2xl font-bold text-yellow-700">
                {chartData.length > 0
                  ? chartData.sort((a, b) => b.value - a.value)[0].name
                  : "N/A"}
              </p>

            </div>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
}

export default AdminDashboard;