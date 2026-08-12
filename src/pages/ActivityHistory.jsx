import { useEffect, useState } from "react";
import UserLayout from "../layouts/UserLayout";
import { getActivities } from "../services/activityService";

import {
  Car,
  Zap,
  Utensils,
  Droplets,
  Trash2,
  Leaf,
  Search
} from "lucide-react";

function ActivityHistory() {

  const [activities, setActivities] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    getActivities(user.id)
      .then((res) => {

        const sorted = res.data.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );

        setActivities(sorted);

      })
      .catch(console.error);

  }, []);

  const getIcon = (category) => {

    switch (category) {

      case "Transportation":
        return <Car size={22} />;

      case "Energy":
        return <Zap size={22} />;

      case "Food":
        return <Utensils size={22} />;

      case "Water":
        return <Droplets size={22} />;

      case "Waste":
        return <Trash2 size={22} />;

      default:
        return <Leaf size={22} />;
    }
  };

  const totalEmission = activities
    .reduce((sum, item) => sum + item.emission, 0)
    .toFixed(2);

  const totalPoints = activities
    .reduce((sum, item) => sum + item.ecoPoints, 0);

  const filteredActivities = activities.filter((activity) => {

    const activityDate = new Date(activity.createdAt);

    const from = fromDate
      ? new Date(fromDate)
      : null;

    const to = toDate
      ? new Date(toDate + "T23:59:59")
      : null;

    const matchesCategory =
      filter === "All" ||
      activity.category === filter;

    const matchesSearch =
      activity.activityType
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesDate =
      (!from || activityDate >= from) &&
      (!to || activityDate <= to);

    return (
      matchesCategory &&
      matchesSearch &&
      matchesDate
    );

  });

  return (

    <UserLayout>

      <h1 className="text-3xl font-bold mb-6">
        Activity History
      </h1>

      {/* Summary */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-gray-500">
            Total Activities
          </h3>

          <p className="text-3xl font-bold text-green-700">
            {activities.length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-gray-500">
            Total Emission
          </h3>

          <p className="text-3xl font-bold text-red-600">
            {totalEmission} kg
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-gray-500">
            Eco Points Earned
          </h3>

          <p className="text-3xl font-bold text-green-600">
            {totalPoints}
          </p>
        </div>

      </div>

      {/* Filters */}

      <div className="bg-white rounded-xl shadow-lg p-5 mb-6">

        <div className="flex flex-col md:flex-row gap-4">

          <div className="flex items-center border rounded-lg px-3 flex-1">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search activities..."
              className="w-full p-2 outline-none"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            className="border rounded-lg p-2"
          >

            <option>All</option>
            <option>Transportation</option>
            <option>Energy</option>
            <option>Food</option>
            <option>Water</option>
            <option>Waste</option>

          </select>

          <input
            type="date"
            value={fromDate}
            onChange={(e) =>
              setFromDate(e.target.value)
            }
            className="border rounded-lg p-2"
          />

          <input
            type="date"
            value={toDate}
            onChange={(e) =>
              setToDate(e.target.value)
            }
            className="border rounded-lg p-2"
          />

        </div>

      </div>

      {/* Activity Cards */}

      <div className="space-y-5">

        {filteredActivities.length === 0 ? (

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">

            <h2 className="text-xl font-semibold">
              No Activities Found
            </h2>

            <p className="text-gray-500 mt-2">
              Start tracking your carbon footprint.
            </p>

          </div>

        ) : (

          filteredActivities.map((activity) => (

            <div
              key={activity.id}
              className="bg-white rounded-xl shadow-lg p-5 flex justify-between items-center hover:shadow-xl transition"
            >

              <div className="flex gap-4">

                <div className="bg-green-100 text-green-700 p-3 rounded-full">

                  {getIcon(activity.category)}

                </div>

                <div>

                  <h3 className="font-bold text-lg">
                    {activity.activityType}
                  </h3>

                  <p className="text-gray-500">
                    {activity.quantity} {activity.unit}
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    {activity.notes || "No notes"}
                  </p>

                  <p className="text-xs text-gray-400 mt-2">

                    {new Date(
                      activity.createdAt
                    ).toLocaleString()}

                  </p>

                </div>

              </div>

              <div className="text-right">

                <p className="text-red-600 font-bold text-lg">

                  {activity.emission.toFixed(2)} kg CO₂

                </p>

                <p className="text-green-600 font-semibold">

                  +{activity.ecoPoints} Points

                </p>

              </div>

            </div>

          ))
        )}

      </div>

    </UserLayout>
  );
}

export default ActivityHistory;