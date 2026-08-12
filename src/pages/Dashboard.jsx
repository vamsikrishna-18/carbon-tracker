import UserLayout from "../layouts/UserLayout";
import DashboardCard from "../components/user/DashboardCard";
import CategoryPieChart from "../components/dashboard/CategoryPieChart";

import {
  Leaf,
  Trophy,
  Flame,
  Target,
  Car,
  Zap,
  Utensils,
  Droplets,
  Recycle
} from "lucide-react";

function UserDashboard() {

  const recentActivities = [
    {
      category: "Transportation",
      icon: <Car size={18} />,
      emission: "2.4 kg CO₂",
      time: "Today"
    },
    {
      category: "Electricity",
      icon: <Zap size={18} />,
      emission: "3.1 kg CO₂",
      time: "Today"
    },
    {
      category: "Food",
      icon: <Utensils size={18} />,
      emission: "1.2 kg CO₂",
      time: "Yesterday"
    }
  ];

  return (
    <UserLayout>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <DashboardCard
          title="Today's CO₂"
          value="6.7 kg"
          icon={<Leaf />}
        />

        <DashboardCard
          title="Eco Points"
          value="650"
          icon={<Trophy />}
        />

        <DashboardCard
          title="Current Streak"
          value="8 Days"
          icon={<Flame />}
        />

        <DashboardCard
          title="Goal Progress"
          value="72%"
          icon={<Target />}
        />

      </div>
      <div className="mt-8">
    <CategoryPieChart />
</div>

      {/* Second Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

        {/* Recent Activities */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-xl font-bold mb-5">
            Recent Activities
          </h2>

          <div className="space-y-4">

            {recentActivities.map((activity, index) => (

              <div
                key={index}
                className="flex justify-between items-center border rounded-lg p-4 hover:bg-gray-50"
              >

                <div className="flex gap-3 items-center">

                  <div className="text-green-600">
                    {activity.icon}
                  </div>

                  <div>

                    <h3 className="font-semibold">
                      {activity.category}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {activity.time}
                    </p>

                  </div>

                </div>

                <div className="font-bold text-green-700">
                  {activity.emission}
                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Eco Tips */}
        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-xl font-bold mb-5">
            🌿 Eco Tips
          </h2>

          <ul className="space-y-4 text-gray-700">

            <li>✅ Use public transport whenever possible.</li>

            <li>✅ Turn off appliances when not in use.</li>

            <li>✅ Carry reusable water bottles.</li>

            <li>✅ Reduce food waste.</li>

            <li>✅ Plant more trees.</li>

          </ul>

        </div>

      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

        <h2 className="text-xl font-bold mb-6">
          Quick Add Activity
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">

          <button className="bg-green-100 hover:bg-green-200 rounded-lg p-6 font-semibold">
            🚗 Transportation
          </button>

          <button className="bg-yellow-100 hover:bg-yellow-200 rounded-lg p-6 font-semibold">
            ⚡ Electricity
          </button>

          <button className="bg-red-100 hover:bg-red-200 rounded-lg p-6 font-semibold">
            🍔 Food
          </button>

          <button className="bg-blue-100 hover:bg-blue-200 rounded-lg p-6 font-semibold">
            💧 Water
          </button>

          <button className="bg-purple-100 hover:bg-purple-200 rounded-lg p-6 font-semibold">
            ♻ Waste
          </button>

        </div>

      </div>

    </UserLayout>
  );
}

export default UserDashboard;